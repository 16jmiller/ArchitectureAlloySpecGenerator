using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArchitectureAlloySpecGenerator.Controllers
{
    public class HomeController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Submit()
        {
            /*
            //Determine from JSON which system is built
            //If clientServer
            ClientServerSystemModel system = new ClientServerSystemModel();

            //If PipeFilter
            PipeFilterSystemModel system = new PipeFilterSystemModel();

            StringBuilder spec = new StringBuilder();
            // Abbie will create the system from Trent's json object here:

            // If Client Server:
            spec = CnsSpecCreater.CreateSpec(system);

            // Abbie will output the spec to the file here:

            */
            return View();
        }
    }
}
