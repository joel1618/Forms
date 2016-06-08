using Breeze.WebApi2;
using Forms.Models;
using Forms.Models.Extensions;
using Forms.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using ValueEntity = Forms.Value;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class ValueApiController : ApiController
    {
        ValueRepository repository;
        public ValueApiController()
        {
            this.repository = new ValueRepository();
        }
        [HttpGet]
        public IQueryable<ValueViewModel> Search()
        {
            return repository.Search().Select(x => new ValueViewModel()
            {
                Id = x.Id,
                FormId = x.FormId,
                CreatedDateTime = x.CreatedDateTime,
                ModifiedDateTime = x.ModifiedDateTime
            });
        }

        [HttpGet]
        public async Task<ValueEntity> Get(Guid id)
        {
            return await repository.Get(id);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(ValueViewModel item)
        {
            ValueViewModel model = null;
            try
            {
                item.UserId = User.Identity.GetUserId();
                var record = await repository.Create(item.ToEntity());
                model = record.ToViewModel();
                return Content(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPut]
        public async Task<ValueEntity> Update(Guid id, ValueEntity item)
        {
            return await repository.Update(id, item);
        }

        [HttpDelete]
        public async void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}