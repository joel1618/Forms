using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using FormDetailsOptionEntity = Forms.FormDetailsOption;
namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormDetailsOptionApiController : ApiController
    {
        FormDetailsOptionRepository repository;
        public FormDetailsOptionApiController()
        {
            this.repository = new FormDetailsOptionRepository();
        }
        [HttpGet]
        public IQueryable<FormDetailsOptionViewModel> Search()
        {
            return repository.Search().Select(x => new FormDetailsOptionViewModel()
            {
                Id = x.Id,
                Name = x.Name
            });
        }

        [HttpPost]
        public async Task<FormDetailsOptionEntity> Get(Guid id)
        {
            return await repository.Get(id);
        }

        [HttpPost]
        public async Task<FormDetailsOptionEntity> Create(FormDetailsOptionEntity item)
        {
            return await repository.Create(item);
        }

        [HttpPut]
        public async Task<FormDetailsOptionEntity> Update(Guid id, FormDetailsOptionEntity item)
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