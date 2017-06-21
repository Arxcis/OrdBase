using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using OrdBase.Services;
using OrdBase.IDataStores;

namespace OrdBase.Controllers
{
	[RoutePrefix("api/{client}/language")]
    public class LanguageController : ApiController
    {
        private IDataStoreLanguage _languageRepo { get; }

        public LanguageController(IDataStoreLanguage languageRepo)
        {
            _languageRepo = languageRepo;
        }
    }
}
