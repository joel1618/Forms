using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Forms.Startup))]
namespace Forms
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
