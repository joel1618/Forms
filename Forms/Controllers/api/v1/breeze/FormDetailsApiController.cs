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
using FormDetailEntity = Forms.FormDetail;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormDetailsApiController : ApiController
    {
        [HttpGet]
        public IQueryable<FormDetailViewModel> Search()
        {
            FormDetailsRepository repository = new FormDetailsRepository();
            var userId = User.Identity.GetUserId();
            return repository.Search().Where(e => e.UserId == userId).Select(x => new FormDetailViewModel()
            {
                CreatedDateTime = x.CreatedDateTime,
                Description = x.Description,
                FormDetailsTypeId = x.FormDetailsTypeId,
                FormId = x.FormId,
                Id = x.Id,
                ModifiedDateTime = x.ModifiedDateTime,
                Name = x.Name,
                Title = x.Title,
                UserId = x.UserId
            }); ;
        }

        [HttpGet]
        public async Task<FormDetailEntity> Get(Guid id)
        {
            FormDetailsRepository repository = new FormDetailsRepository();
            var item = await repository.Get(id);
            var userId = User.Identity.GetUserId();
            if (item.UserId == userId)
                return item;
            return null;
        }

        [HttpPost]
        public async Task<FormDetailEntity> Create(FormDetailEntity item)
        {
            FormDetailsRepository repository = new FormDetailsRepository();
            item.UserId = User.Identity.GetUserId();
            return await repository.Create(item);
        }

        [HttpPut]
        public async Task<FormDetailEntity> Update(Guid id, FormDetailEntity item)
        {
            FormDetailsRepository repository = new FormDetailsRepository();
            return await repository.Update(id, item);
        }

        [HttpDelete]
        public async void Delete(Guid id)
        {
            FormDetailsRepository repository = new FormDetailsRepository();
            repository.Delete(id);
        }
    }
}