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
        // GET translation
        //
        [HttpGet("api/translation")]
    	public IEnumerable<Translation> Get([FromQuery] TranslationQuery query)
        {
            return _translationRepo.Get(query); 
        }

        [HttpGet("api/translation/group")]
        public IEnumerable<TranslationGroup> GetGroup([FromQuery] TranslationGroupQuery query) 
        {
            return  _translationRepo.GetGroup(query);
        }   

        [HttpGet("api/translation/group/meta")]
        public IEnumerable<TranslationGroupMeta> GetGroupMeta([FromQuery] TranslationGroupQuery query)
        {
            return _translationRepo.GetGroupMeta(query);
        } 

        [HttpGet("api/translation/container")]
        public IEnumerable<TranslationKeyValue> GetKeyValue([FromQuery] TranslationQuery query)
        {
            return _translationRepo.GetKeyValue(query); 
        }

        //
        // POST, PUT, DELETE translation
        //  @doc https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-vsc#implement-the-other-crud-operations|
        //
        [HttpPost("api/translation/create")]
        public IActionResult Create([FromBody] Translation translation) 
        {   
            if (translation == null)
                return  BadRequest();

            return _translationRepo.Create(translation);
        } 


        [HttpPost("api/translation/create/array")]
        public IActionResult CreateArray([FromBody] IEnumerable<Translation> translationArray) 
        {   
            if (translationArray == null)
                return  BadRequest();

            return _translationRepo.CreateArray(translationArray);
        }

        [HttpPut("api/translation/update")]
        public IActionResult Update([FromQuery] TranslationQuery query, [FromBody] Translation translation)
        {   
            if (translation == null || query == null) 
                return BadRequest();
            
            return _translationRepo.Update(query, translation);
        }

        [HttpDelete("api/translation/delete")]
        public IActionResult Delete([FromQuery] TranslationQuery query)
        {
            return _translationRepo.Delete(query);
        }

        [HttpDelete("api/translation/delete/group")]
        public IActionResult DeleteGroup([FromQuery] TranslationGroupQuery query)
        {
            return _translationRepo.DeleteGroup(query);
        }
    }
}
