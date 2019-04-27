using System.Web.Optimization;

namespace ArchitectureAlloySpecGenerator
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/Libraries/JQuery/jquery-1.10.2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/Libraries/Modernizr/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/Libraries/Bootstrap/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/fabricjs").Include(
                "~/Scripts/Libraries/FabricJS/fabric.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/diagrammer").Include(
                "~/Scripts/Source/Diagrammer.js",
                "~/Scripts/Source/DiagramEditor.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Styles/Libraries/Bootstrap/bootstrap.min.css",
                "~/Content/Styles/Source/Site.css",
                "~/Content/Styles/Source/ArchitectureDiagrammer.css"));

            bundles.Add(new StyleBundle("~/bundles/fontawesome").Include(
                "~/Content/Styles/Libraries/FontAwesome/css/all.min.css"));
        }
    }
}
