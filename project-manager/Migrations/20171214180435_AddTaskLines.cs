using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace projectmanager.Migrations
{
    public partial class AddTaskLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskLines",
                columns: table => new
                {
                    TaskLineID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FromID = table.Column<int>(nullable: false),
                    ToID = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskLines", x => x.TaskLineID);
                    table.ForeignKey(
                        name: "FK_TaskLines_Tasks_FromID",
                        column: x => x.FromID,
                        principalTable: "Tasks",
                        principalColumn: "TaskID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_TaskLines_Tasks_ToID",
                        column: x => x.ToID,
                        principalTable: "Tasks",
                        principalColumn: "TaskID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskLines_FromID",
                table: "TaskLines",
                column: "FromID");

            migrationBuilder.CreateIndex(
                name: "IX_TaskLines_ToID",
                table: "TaskLines",
                column: "ToID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskLines");
        }
    }
}
