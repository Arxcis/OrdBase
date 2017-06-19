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
        public ActionResult App(string client = "Javazoneer")
        {
            ViewBag.Title = "App - Translation";
            //
            // @brief Building IndexViewModel
            // Building ViewModel
            // 
            var appViewModel = new AppViewModel
            {
                ClientName = client,
                Translations = db.Translation
                    .Where(o => o.RegisteredClient.Name.Equals(client)) as IEnumerable<Translation>,
                Categories = db.StringCategory
                    .Where(o => o.RegisteredClient.Name.Equals(client)) as IEnumerable<StringCategory>
            };

            return View(appViewModel);
        }
    }
}