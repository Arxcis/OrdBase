using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        //
        // GET REQUESTS
        //
        [Route("api/{client}/translation/{container}/{accessKey}/{language}")]
        [HttpGet]
    	public Translation[] Get(string client, string language, string container, string accesskey)
        {
            return _translationRepo.Get(client, language, container, accesskey); 
        }
        
        [Route("api/{client}/translation")]
        [HttpGet]
        public Translation[] GetOnClient(string client)
        {
            return _translationRepo.GetOnClient(client); 
        }
        
        [Route("api/{client}/translation/container/{container}")]
        [HttpGet]
        public IQueryable<object> GetOnContainer(string client, string container)
        {
            return _translationRepo.GetOnContainer(client, container); 
        }

        [Route("api/{client}/translation/container/{container}/{language}")]
        [HttpGet]
        public Dictionary<string, string> GetOnContainer(string client, string language, string container)
        {
            return _translationRepo.GetOnContainer(client, language, container); 
        }

        [Route("api/{client}/translation/accesskey/{accesskey}")]
        [HttpGet]
        public Translation[] GetOnAccessKey(string client, string accesskey)
        {
            return _translationRepo.GetOnAccessKey(client, accesskey); 
        }

        [Route("api/{client}/translation/language/{language}")]
        [HttpGet]
        public Translation[] GetOnLanguage(string client, string language)
        {
            return _translationRepo.GetOnLanguage(client, language); 
        }
        
        //
        // CREATE, UPDATE, DELETE REQUESTS
        //  @doc https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-vsc#implement-the-other-crud-operations|
        [Route("api/translation/create")]
        [HttpPost]
        public IActionResult Create([FromBody] Translation translation) 
        {   
            if (translation == null)
                return  BadRequest();
            return _translationRepo.Create(translation);
        } 

        [Route("api/translation/update")]
        [HttpPut]
        public IActionResult Update(string client, string language, string container, string accesskey,
                                         [FromBody] Translation translation)
        {   
            //
            // @note Following the RestAPI http put standard here
            //        Maybe the client should generated a single temp id.
            //
            if (translation == null || translation.CId != client || translation.Lang != language
                    || translation.Box != container || translation.Key != accesskey)
            { 
                return BadRequest();
            }

            


        }
    }
}
