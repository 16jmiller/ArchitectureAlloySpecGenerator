using ArchitectureAlloySpecGenerator.Interfaces;
using ArchitectureAlloySpecGenerator.Models;
using ArchitectureAlloySpecGenerator.Translator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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

        [HttpPost]
        public ActionResult Submit(string json)
        {

            StringBuilder spec = new StringBuilder();
            //String json = new StreamReader(this.Request.InputStream).ReadToEnd();

            if (json.Contains("ClientServer"))
            {
                ClientServerJSONTranslator CnsJSONTranslator = new ClientServerJSONTranslator();
                ClientServerSpecCreator CnsSpecCreator = new ClientServerSpecCreator();

                ClientServerSystemModel system = CnsJSONTranslator.CreateModel(json);
                spec = CnsSpecCreator.CreateSpec(system);
            }
            else if (json.Contains("PipeAndFilter"))
            {
                PipeFilterJSONTranslator PnfJSONTranslator = new PipeFilterJSONTranslator();
                PipeFilterSpecCreator PnfSpecCreator = new PipeFilterSpecCreator();

                PipeFilterSystemModel system = PnfJSONTranslator.CreateModel(json);
                spec = PnfSpecCreator.CreateSpec(system);
            }

            saveFileClientSide(spec);

            return new EmptyResult();
        }

        private void saveFileClientSide(StringBuilder sb)
        {
            var contentType = "text/plain";
            var fileName = "alloySpecification.als";
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
