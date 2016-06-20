using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forms.Controllers
{
    public class FameTemplateController : Controller
    {
        public ActionResult Index()
        {
            //if logged in reroute?
            //return RedirectToAction("Index", "Form");
            //else
            return PartialView();
        }
    }
}