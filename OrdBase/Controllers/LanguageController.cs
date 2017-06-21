using System.Web.Http;

using OrdBase.Models;
using OrdBase.IData;

namespace OrdBase.Controllers
{
    public class LanguageController : ApiController, ILanguageData
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
