using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

using OrdBaseCore.Models;

namespace OrdBaseCore.Controllers
{
    public class AppViewModel 
    {
        public string AppName { get; set; }
        public string AccessLevel { get; set; }
        public string ClientName { get; set; }
    }

    public class AppController : Controller
    {
        public ActionResult Index(string client = "FMSF")
        {  
            return View(new AppViewModel
            {   
                AppName = "OrdBaseCore",
                AccessLevel = "Admin",
                ClientName = client
            });
        }
    }
}