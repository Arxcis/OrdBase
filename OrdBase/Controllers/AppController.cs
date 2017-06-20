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
            ViewBag.Title = "OrdBase - Admin";
            var appViewModel = new AppViewModel { ClientName = client, };
            return View(appViewModel);
        }


        public ActionResult Editor(string client)
        {

            return PartialView();
        }

        public ActionResult Selector(string client)
        {
            return PartialView();
        }
    }
}