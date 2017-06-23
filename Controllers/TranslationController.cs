using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Controllers
{
    public class TranslationController : Controller
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
    	public IEnumerable<Translation> Get(string client, string language, string container, string accesskey)
        {
            return _translationRepo.Get(client, language, container, accesskey); 
        }
        
        [Route("api/{client}/translation")]
        [HttpGet]
        public IEnumerable<Translation> GetOnClient(string client)
        {
            return _translationRepo.GetOnClient(client); 
        }
        
        [Route("api/{client}/translation/container/{container}")]
        [HttpGet]
        public IEnumerable<object> GetOnContainer(string client, string container)
        {
            return _translationRepo.GetOnContainer(client, container); 
        }

        [Route("api/{client}/translation/container/{container}/{language}")]
        [HttpGet]
        public IEnumerable<KeyValuePair<string,string>> GetOnContainer(string client, string language, string container)
        {
            return _translationRepo.GetOnContainer(client, language, container); 
        }

        [Route("api/{client}/translation/accesskey/{accesskey}")]
        [HttpGet]
        public IEnumerable<Translation> GetOnAccessKey(string client, string accesskey)
        {
            return _translationRepo.GetOnAccessKey(client, accesskey); 
        }

        [Route("api/{client}/translation/language/{language}")]
        [HttpGet]
        public IEnumerable<Translation> GetOnLanguage(string client, string language)
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

        [Route("api/{client}/translation/update/{container}/{accessKey}/{language}")]
        [HttpPut]
        public IActionResult Update(string client, string language, string container, string accesskey,
                                         [FromBody] Translation translation)
        {   
            //
            // @note Following the RestAPI http put standard here
            //        Maybe the client should generated a single temp id.
            // @note2 BadRequest() can only be done inside the controller as I am aware of,
            //         At first glance this is seems like a violation of the "no-logic-inside-the-controoller-paradigm"
            //         I think the problem here is that ASP.NET casts the HTTP object to a data-specific type already
            //         in the parameter-list of the controller. This is a clear DEPENDENCY of the underlying
            //         database implementation, but again we could also say that for all the Translation[] 
            //           return types in the controller. - J Solsvik 23. 06. 17
            //
            if (translation == null || translation.CId != client || translation.Lang != language
                    || translation.Box != container || translation.Key != accesskey)
            { 
                return BadRequest();
            }

            return _translationRepo.Update(translation);
        }

        [Route("api/{client}/translation/delete/{container}/{accessKey}/{language}")]
        public IActionResult Delete(string client, string language, string container, string accesskey)
        {
            return _translationRepo.Delete(client, language, container, accesskey);
        }
    }
}
