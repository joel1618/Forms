using Forms.Models;
using Forms.Repositories;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Linq.Expressions;
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
        public List<List<string>> Search(int page, int pageSize)
        {
            var response = repository.Search(page, pageSize);
            List<List<string>> items = new List<List<string>>();
            foreach (var item in response)
            {
                Dictionary<string, string> model = new Dictionary<string, string>();
                var properties = item.GetType().GetProperties(BindingFlags.Public);
                foreach (var property in properties)
                {
                    var PropertyName = property.Name;
                    var PropertyValue = item.GetType().GetProperty(property.Name).GetValue(item, null);
                    model.Add(PropertyName, PropertyValue);
                }
                //items.Add(model);
            }
            return items;
        }        
    }
}