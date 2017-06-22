using Microsoft.AspNetCore.Mvc;
using System.Linq;

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

        [Route("api/{client}/translation/{container}/{accessKey}/{language}")]
    	public Translation[] Get(string client, string language, string container, string accesskey)
        {
            return _translationRepo.Get(client, language, container, accesskey); 
        }
        
        [Route("api/{client}/translation")]
        public Translation[] GetOnClient(string client)
        {
            return _translationRepo.GetOnClient(client); 
        }
        
        [Route("api/{client}/translation/container/{container}")]
        public IQueryable<object> GetOnContainer(string client, string container)
        {
            return _translationRepo.GetOnContainer(client, container); 
        }

        [Route("api/{client}/translation/container/{container}/{language}")]
        public IQueryable<object> GetOnContainer(string client, string language, string container)
        {
            return _translationRepo.GetOnContainer(client, language, container); 
        }

        [Route("api/{client}/translation/accesskey/{accesskey}")]
        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return _translationRepo.GetOnAccessKey(client, accesskey); 
        }

        [Route("api/{client}/translation/language/{language}")]
        public Translation[] GetOnLanguage(string client, string language)
        {
            return _translationRepo.GetOnLanguage(client, language); 
        }
    }
}
