using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArchitectureAlloySpecGenerator.Interfaces;
using ArchitectureAlloySpecGenerator.Models;
using System.Text;

namespace ArchitectureAlloySpecGenerator.Controllers
{
    public class HomeController : Controller
    {
        private IClientServerSpecCreator CnsSpecCreater;

        // GET: Default
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Submit()
        {
            ClientServerSystemModel system = new ClientServerSystemModel();
            StringBuilder spec = new StringBuilder();
            // Abbie will create the system from Trent's json object here:

            // If Client Server:
            spec = CnsSpecCreater.CreateSpec(system);

            // Abbie will output the spec to the file here:

            return View();
        }
    }
}