using System.Web;
using System.Web.Optimization;

namespace OrdBase
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle(
                "~/bundles/App").Include(
                    "~/Scripts/KeyCodes.js",
                    "~/Scripts/App.js",
                    "~/Scripts/Selector.js",
                    "~/Scripts/Editor.js"));

            bundles.Add(new StyleBundle(
                "~/Content/css").Include(
                    "~/Content/bootstrap.css",
                    "~/Content/site.css",
                    "~/Content/App.css",
                    "~/Content/Selector.css",
                    "~/Content/Editor.css"));
        }
    }
}
