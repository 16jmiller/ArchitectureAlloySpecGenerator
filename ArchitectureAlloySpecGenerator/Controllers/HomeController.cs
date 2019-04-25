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

            saveFileClientSide(spec);
           
            return View();
        }

        private void saveFileClientSide(StringBuilder sb)
        {
            var contentType = "text/plain";
            var fileName = "alloySpecification.txt";
            var header = "attachment;Filename=" + fileName;

            Response.Clear();
            Response.Buffer = true;
            Response.ContentType = contentType;
            Response.AppendHeader("Content-Disposition", header);

            Response.Write(sb.ToString());
            Response.Flush();
        }
    }

}