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
        // CREATE   @doc https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-vsc#implement-the-other-crud-operations|
        //
        [Route("api/create/client")]
        [HttpPost]
        public IActionResult Create([FromBody] Language language) 
        {   
            if (language == null)
                return  BadRequest();
            return _languageRepo.Create(language);
        } 
    }
}
