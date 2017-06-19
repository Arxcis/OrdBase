using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using OrdBase.Models;
using OrdBase.ViewModels;

namespace OrdBase.Controllers
{
    public class AppController : Controller
    {
        private TranslationDb db = new TranslationDb();

        public ActionResult Index(string client = "FMSF")
        {
            ViewBag.Title = "App - Translation";

            var appViewModel = new AppViewModel
            {
                ClientName = client,

                TranslationCount = db
                    .Translation
                    .Where(o => o.RegisteredClient.Name.Equals(client))
                    .Count(),

                TranslationCompleteCount = db
                    .Translation
                    .Where(o => o.IsComplete)
                    .Count(),
            };
            return View(appViewModel);
        }


        public ActionResult Editor(string client)
        {



          
            return PartialView(selectorViewModel);
        }

        public ActionResult Selector(string client)
        {
            return PartialView();
        }
    }
}