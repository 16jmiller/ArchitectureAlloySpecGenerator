using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArchitectureAlloySpecGenerator.Interfaces;
using ArchitectureAlloySpecGenerator.Models;
using System.Text;
using Newtonsoft.Json;

namespace ArchitectureAlloySpecGenerator.Controllers
{
    public class HomeController : Controller
    {
        private IClientServerSpecCreator CnsSpecCreator;
        private IPipeFilterSpecCreator PnfSpecCreator;

        // GET: Default
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Submit()
        {
            StringBuilder spec = new StringBuilder();
            String json = new StreamReader(this.Request.InputStream).ReadToEnd();

            if (json.Contains("ClientServer"))
            {
                var system = JsonConvert.DeserializeObject<ClientServerSystemModel>(json);
                spec = CnsSpecCreator.CreateSpec(system);
            }
            else if (json.Contains("PipeAndFilter"))
            {
                var system = JsonConvert.DeserializeObject<PipeFilterSystemModel>(json);
                spec = PnfSpecCreator.CreateSpec(system);
            }

            saveFileClientSide(spec);

            return new EmptyResult();
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