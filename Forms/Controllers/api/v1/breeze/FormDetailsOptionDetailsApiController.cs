using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using FormDetailsOptionDetailEntity = Forms.FormDetailsOptionDetail;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormDetailsOptionDetailsApiController : ApiController
    {
        FormDetailsOptionDetailsRepository repository;
        public FormDetailsOptionDetailsApiController()
        {
            this.repository = new FormDetailsOptionDetailsRepository();
        }
        [HttpGet]
        public IQueryable<FormDetailsOptionDetailViewModel> Search()
        {
            return repository.Search().Select(x => new FormDetailsOptionDetailViewModel()
            {
                Id = x.Id,
                FormDetailsOptionId = x.FormDetailsOptionId,
                Name = x.Name
            });
        }

        [HttpPost]
        public async Task<FormDetailsOptionDetailEntity> Get(Guid id)
        {
            return await repository.Get(id);
        }

        [HttpPost]
        public async Task<FormDetailsOptionDetailEntity> Create(FormDetailsOptionDetailEntity item)
        {
            return await repository.Create(item);
        }

        [HttpPut]
        public async Task<FormDetailsOptionDetailEntity> Update(Guid id, FormDetailsOptionDetailEntity item)
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