using System.Web.Http;

using OrdBase.Models;
using OrdBase.IData;

namespace OrdBase.Controllers
{
	[RoutePrefix("api/{client}/translation")]
    public class TranslationController : ApiController, ITranslationData
    {   
        private readonly ITranslationData _translationRepo;

        public TranslationController(ITranslationData translationRepo)
        {
            _translationRepo = translationRepo;
        }

        [Route("{container}/{accessKey}/{language}")]
    	public Translation[] Get(string client, string language, string container, string accesskey)
        {
            return _translationRepo.Get(client, language, container, accesskey); 
        }
        
        [Route("")]
        public Translation[] GetOnClient(string client)
        {
            return _translationRepo.GetOnClient(client); 
        }
        
        [Route("container/{container}")]
        public Translation[] GetOnContainer(string client, string container)
        {
            return _translationRepo.GetOnContainer(client, container); 
        }

        [Route("container/{container}/{language}")]
        public Translation[] GetOnContainer(string client, string language, string container)
        {
            return _translationRepo.GetOnContainer(client, language, container); 
        }

        [Route("accesskey/{accesskey}")]
        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return _translationRepo.GetOnAccessKey(client, accesskey); 
        }

        [Route("language/{language}")]
        public Translation[] GetOnLanguage(string client, string language)
        {
            return _translationRepo.GetOnLanguage(client, language); 
        }
    }
}
