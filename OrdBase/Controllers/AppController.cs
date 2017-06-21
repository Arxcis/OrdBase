using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

using OrdBase.Models;
using OrdBase.ViewModels;

namespace OrdBase.Controllers
{
    public class AppController : Controller
    {
        private TranslationDb db = new TranslationDb();

        private List<string> GetClientCategories(string client)
        {
            return new List<string>{};
        }

        public ActionResult Index(string client = "FMSF")
        {
            return View(new AppViewModel
            {   
                AppName = "OrdBase",
                AccessLevel = "Admin",
                ClientName = client
            });
        }


        public ActionResult Editor(string client, string accessKey)
        {
            return PartialView(new EditorViewModel {});
        }


        public ActionResult Selector(string client)
        {
            //
            // @doc Group by - https://stackoverflow.com/questions/7325278/group-by-in-linq
            // @doc More group by - https://stackoverflow.com/questions/2697253/using-linq-to-group-a-list-of-objects-into-a-new-grouped-list-of-list-of-objects
            // @doc MSDN Linq examples - https://msdn.microsoft.com/en-us/library/gg509017.aspx
            //
            return PartialView(new SelectorViewModel{});
            
        }
    }
}