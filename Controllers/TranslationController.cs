using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Controllers
{
    public class TranslationController : Controller, ITranslationData
    {   
        private readonly ITranslationData _translationRepo;

        public TranslationController(ITranslationData translationRepo)
        {
            _translationRepo = translationRepo;
        }

        [Route("api/{client}/{container}/{accessKey}/{language}")]
    	public Translation[] Get(string client, string language, string container, string accesskey)
        {
            return _translationRepo.Get(client, language, container, accesskey); 
        }
        
        [Route("api/{client}")]
        public Translation[] GetOnClient(string client)
        {
            return _translationRepo.GetOnClient(client); 
        }
        
        [Route("api/{client}/container/{container}")]
        public Translation[] GetOnContainer(string client, string container)
        {
            return _translationRepo.GetOnContainer(client, container); 
        }

        [Route("api/{client}/container/{container}/{language}")]
        public Translation[] GetOnContainer(string client, string language, string container)
        {
            return _translationRepo.GetOnContainer(client, language, container); 
        }

        [Route("api/{client}/accesskey/{accesskey}")]
        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return _translationRepo.GetOnAccessKey(client, accesskey); 
        }

        [Route("api/{client}/language/{language}")]
        public Translation[] GetOnLanguage(string client, string language)
        {
            return _translationRepo.GetOnLanguage(client, language); 
        }
    }
}
