using System.Collections.Generic;
using System.Web.Http;

using OrdBase.Services;
using OrdBase.Models;

namespace OrdBase.Controllers
{
	[RoutePrefix("api/{client}/translation")]
    public class TranslationController : ApiController
    {   
        [Route("dummy")]
        public Translation Get()
        {
            using (var translationRepo = new TranslationRepository()) 
            { return translationRepo.GetDummy(); }
        }

        [Route("{container}/{accessKey}/{language}")]
    	public Translation[] Get(string client, string language, string container, string accesskey)
        {
            using (var translationRepo = new TranslationRepository())
            { return translationRepo.Get(client, language, container, accesskey); }
        }
        
        [Route("")]
        public Translation[] GetOnClient(string client)
        {
            using (var translationRepo = new TranslationRepository()) 
            { return translationRepo.GetOnClient(client); }
        }
        
        [Route("container/{container}")]
        public Translation[] GetOnContainer(string client, string container)
        {
            using (var translationRepo = new TranslationRepository()) 
            { return translationRepo.GetOnContainer(client, container); }
        }

        [Route("container/{container}/{language}")]
        public Translation[] GetOnContainer(string client, string language, string container)
        {
            using (var translationRepo = new TranslationRepository()) 
            { return translationRepo.GetOnContainer(client, language, container); }
        }

        [Route("accesskey/{accesskey}")]
        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            using (var translationRepo = new TranslationRepository()) 
            { return translationRepo.GetOnAccessKey(client, accesskey); }
        }

        [Route("language/{language}")]
        public Translation[] GetOnLanguage(string client, string language)
        {
            using (var translationRepo = new TranslationRepository()) 
            { return translationRepo.GetOnLanguage(client, language); }
        }
    }
}
