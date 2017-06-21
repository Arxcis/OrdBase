using System.Web.Mvc;
using Microsoft.Practices.Unity;
using OrdBase.Services;
using OrdBase.IData;

using System.Web.Http;


namespace OrdBase
{   // @doc Super tutorial!! -- https://www.devtrends.co.uk/blog/using-unity.mvc5-and-unity.webapi-together-in-a-project
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<ITranslationData, TranslationRepository>();
            container.RegisterType<ILanguageData, LanguageRepository>();
            container.RegisterType<IClientData,      ClientRepository>();
            container.RegisterType<IContainerData, ContainerRepository>();

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }
    }
}