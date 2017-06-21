using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;
using OrdBaseCore.IData;

namespace OrdBaseCore.Controllers
{
    public class LanguageController : Controller, ILanguageData
    {
        private readonly ILanguageData _languageRepo;

        public LanguageController(ILanguageData languageRepo)
        {
            _languageRepo = languageRepo;
        }

        [Route("api/language")]
        public Language[] GetAll()
        {
            return _languageRepo.GetAll();
        }

        [Route("api/{client}/language")]
        public Language[] GetOnClient(string client) 
        {
            return _languageRepo.GetOnClient(client);
        }
    }
}
