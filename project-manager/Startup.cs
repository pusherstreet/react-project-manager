using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using project_manager.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using project_manager.components;
using Microsoft.IdentityModel.Tokens;

namespace project_manager
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            
                            ValidateIssuer = true,
                            
                            ValidIssuer = AuthOptions.ISSUER,

                            
                            ValidateAudience = true,
                            
                            ValidAudience = AuthOptions.AUDIENCE,
                            
                            ValidateLifetime = true,

                            
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                           
                            ValidateIssuerSigningKey = true,
                        };
                    });

            string connection = Configuration.GetConnectionString("DefaultConnection");
          
            services.AddDbContext<Context>(options =>
                options.UseInMemoryDatabase("db"));
            
            services.AddMvc()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            
            app.UseAuthentication();
            app.UseStaticFiles();
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<Context>();
                InitDatabase(context);
            }
           

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
        // Initialize in-memory database
        private void InitDatabase(Context db){
            var guid = Guid.NewGuid();
            db.Users.Add(new User(){
                Email = "test@email.com",
                Password = "123",
                UserID = guid,
            });
            var guid1 = Guid.NewGuid();
            db.Users.Add(new User(){
                Email = "another@mail.com",
                Password = "321",
                UserID = guid1
            });
            db.Statuses.AddRange(new Status[]{
                new Status { StatusID = 1, Name = "Done"},
                new Status {StatusID = 2, Name = "Created"},
                new Status {StatusID = 3, Name = "Canceled"},
                new Status {StatusID = 4, Name = "Approved"},
                new Status {StatusID = 5, Name = "Confirmed"}
            });
            db.Tasks.Add(new project_manager.Models.Task(){
                TaskID = 1,
                Title = "Website Testing",
                Description = "Do website testing",
                Start = DateTime.Now,
                End = DateTime.Now.AddHours(1),
                Created = DateTime.Now,
                UserID = guid,
                StatusID = 1,
                Status = new Status { StatusID = 1, Name = "Done"},
                ProjectID = 1,
                Effort = 10
            });
            db.Tasks.Add(new project_manager.Models.Task(){
                TaskID = 2,
                Title = "SQL Script Execute",
                Description = "Clean up testing emails",
                Start = DateTime.Now.AddDays(5),
                End = DateTime.Now.AddDays(11),
                Created = DateTime.Now,
                UserID = guid,
                StatusID = 2,
                Status = new Status { StatusID = 1, Name = "Done"},
                ProjectID = 2,
                Effort = 3
            });
            db.Projects.Add(
                new Project{
                    ProjectID = 1,
                    Title = "Default project",
                    Description = "Default project",
                    UserID = guid,
                    Created = DateTime.Now
                }
            );
            db.Projects.Add(
                new Project{
                    ProjectID = 2,
                    Title = "Startup project",
                    Description = "Startup project",
                    UserID = guid,
                    Created = DateTime.Now
                }
            );
            db.UserToProjects.Add(
                new UserToProject{
                    UserToProjectID = 1,
                    UserID = guid,
                    ProjectID = 1
                }
            );
             db.UserToProjects.Add(
                new UserToProject{
                    UserToProjectID = 2,
                    UserID = guid,
                    ProjectID = 2
                }
            );
             db.UserToProjects.Add(
                new UserToProject{
                    UserToProjectID = 3,
                    UserID = guid1,
                    ProjectID = 1
                }
            );
            db.Configurations.Add(
                new Configuration{
                    ConfigurationID = 1,
                    UserID = guid,
                    Theme = "Light",
                    Notifications = false
                }
            );
            db.TaskHistories.Add(new TaskHistory{
                TaskHistoryID = 1,
                TaskID = 1,
                Created = DateTime.Now,
                UserID = guid,
                Message = "Hello, am create this task!",
            });
            db.TaskHistories.Add(new TaskHistory{
                TaskHistoryID = 2,
                TaskID = 1,
                Created = DateTime.Now,
                UserID = guid,
                Message = "Hola",
            });
            db.SaveChanges();
        }
    }
}
