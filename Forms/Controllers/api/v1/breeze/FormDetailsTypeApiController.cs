using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Net;
using FormDetailsTypeEntity = Forms.FormDetailsType;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormDetailsTypeApiController : ApiController
    {
        FormDetailsTypeRepository repository;
        public FormDetailsTypeApiController()
        {
            this.repository = new FormDetailsTypeRepository();
        }
        [HttpGet]
        public IQueryable<FormDetailTypeViewModel> Search()
        {
            return repository.Search().Select(x => new FormDetailTypeViewModel()
            {
                Id = x.Id,
                Name = x.Name
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var item = await repository.Get(id);            
            return Content(HttpStatusCode.OK, new FormDetailTypeViewModel()
            {
                Id = item.Id,
                Name = item.Name
            });
        }

        [HttpPost]
        public async Task<FormDetailsTypeEntity> Create(FormDetailsTypeEntity item)
        {
            return await repository.Create(item);
        }

        [HttpPut]
        public async Task<FormDetailsTypeEntity> Update(Guid id, FormDetailsTypeEntity item)
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