using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Net.Http.Headers;

namespace OrdBase
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            
            // Make JSON default return value
            // @doc https://stackoverflow.com/questions/9847564/how-do-i-get-asp-net-web-api-to-return-json-instead-of-xml-using-chrome
            config.Formatters
                  .JsonFormatter
                  .SupportedMediaTypes
                  .Add(new MediaTypeHeaderValue("text/html") );
        }
    }
}
