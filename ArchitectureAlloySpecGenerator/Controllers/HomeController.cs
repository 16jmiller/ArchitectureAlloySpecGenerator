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
        private IClientServerSpecCreator CnsSpecCreater;

        // GET: Default
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Submit(JsonResult content)
        {

            StringBuilder spec = new StringBuilder();

            // If Client Server:
            ClientServerSystemModel system = new ClientServerSystemModel();
            spec = CnsSpecCreater.CreateSpec(system);

            saveFileClientSide(spec);
           
            return new EmptyResult();
        }

        public void LoadJson()
        {
            ClientServerSystemModel arch = null;
            using (StreamReader r = new StreamReader("file.json"))
            {
                string json = r.ReadToEnd();
                if (json.Contains("ClientServer"))
                {
                    arch = JsonConvert.DeserializeObject<ClientServerSystemModel>(json);
                }
            }
            return;
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