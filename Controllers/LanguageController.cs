using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Controllers
{
    public class LanguageController : Controller
    {
        private readonly ILanguageData _languageRepo;

        public LanguageController(ILanguageData languageRepo)
        {
            _languageRepo = languageRepo;
        }

        //
        // GET
        //
        [Route("api/language")]
        public IEnumerable<Language> GetAll()
        {
            return _languageRepo.GetAll();
        }

        [Route("api/{client}/language")]
        public IEnumerable<Language> GetOnClient(string client) 
        {
            return _languageRepo.GetOnClient(client);
        }

        //
        // CREATE, UPDATE, DELETE   @doc https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-vsc#implement-the-other-crud-operations|
        //
        [Route("api/language/create")]
        [HttpPost]
        public IActionResult Create([FromBody] Language language) 
        {   
            if (language == null)
                return  BadRequest();
            return _languageRepo.Create(language);
        } 

        [Route("api/language/update")]
        [HttpPut("{key}")]
        public IActionResult Update(string key, [FromBody]Language language) 
        {
            if (language == null && language.Key != key) 
                return BadRequest();

            return _languageRepo.Update(language);
        }

        [Route("api/language/delete")]
        [HttpDelete("{key}")]
        public IActionResult Delete(string key) 
        {
            return _languageRepo.Delete(key);
        }
    }
}
