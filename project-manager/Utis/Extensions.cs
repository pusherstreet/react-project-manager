using Microsoft.AspNetCore.Http;
using System;

namespace project_manager.Utis{
    public static class Extensions{
        public static bool IsAjax(this HttpRequest request){
            if (request == null)
                throw new ArgumentNullException("request");

            if (request.Headers != null)
                return request.Headers["X-Requested-With"] == "XMLHttpRequest";
            return false;
        }
    }
}