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

        public ActionResult Index(string client = "FMSF")
        {
            return View(new AppViewModel
            {   
                AppName = "OrdBase",
                AccessLevel = "Admin",
                ClientName = client
            });
        }
    }
}