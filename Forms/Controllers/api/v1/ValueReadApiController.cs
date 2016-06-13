using Forms.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace Forms.Controllers.api.v1
{
    [RoutePrefix("api/v1/ValueReadApi")]
    public class ValueReadApiController : ApiController
    {
        ValueReadRepository repository;
        public ValueReadApiController()
        {
            this.repository = new ValueReadRepository();
        }
        [Route("Search/page={page}/pagesize={pagesize}")]
        [HttpGet]
        public List<KeyValuePair<string, string>> Search(int page, int pageSize)
        {
            var response = repository.Search(page, pageSize);
            var items = new List<KeyValuePair<string, string>>();
            foreach (var item in response)
            {
                foreach (CustomAttributeData attribute in item.GetType().CustomAttributes)
                {
                    var name = attribute.GetType().Name;
                    var value = "";// attribute.
                    var pair = new KeyValuePair<string, string>(name, value);
                    items.Add(pair);
                }
            }
            return items;
        }
    }
}