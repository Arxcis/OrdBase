using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.EntityFrameworkCore;
using OrdBaseCore.Models;
using OrdBaseCore.IData;
using OrdBaseCore.Services;

namespace OrdBaseCore
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        
        // @doc Set up MySql service - https://damienbod.com/2016/08/26/asp-net-core-1-0-with-mysql-and-entity-framework-core/
        // @doc scoped vs transient vs singleton - https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection#service-lifetimes-and-registration-options
        
        public static IConfiguration Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile("config.json", optional: true, reloadOnChange: true);
                
            Configuration = builder.Build();
        }
         
        public void ConfigureServices(IServiceCollection services)
        {
            var sqlConnectionString = Configuration.GetConnectionString("DataAccessMySqlProvider");

            services.AddDbContext<TranslationDb>(options => 
                options.UseMySql(
                    sqlConnectionString,
                    b => b.MigrationsAssembly("OrdBaseCore")
                )
            );
            services.AddMvc();

            services.AddTransient<IClientData,      ClientRepository>();
            services.AddTransient<IContainerData,   ContainerRepository>();
            services.AddTransient<ILanguageData,    LanguageRepository>();
            services.AddTransient<ITranslationData, TranslationRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
