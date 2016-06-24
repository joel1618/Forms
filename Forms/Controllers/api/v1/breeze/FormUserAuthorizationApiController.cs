using Breeze.WebApi2;
using Forms.Models;
using Forms.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using FormUserAuthorizationEntity = Forms.FormUserAuthorization;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class FormUserAuthorizationApiController : ApiController
    {
        FormUserAuthorizationRepository repository;
        public FormUserAuthorizationApiController()
        {
            this.repository = new FormUserAuthorizationRepository();
        }
        [HttpGet]
        public IQueryable<FormUserAuthorizationEntity> Search()
        {
            IQueryable<FormUserAuthorizationEntity> response = null;
            try {
                var userId = User.Identity.GetUserId();
                response = repository.Search();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            return response;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var item = await repository.Get(id);
            return Content(HttpStatusCode.OK, new FormUserAuthorizationEntity()
            {
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,
            });
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(FormUserAuthorizationEntity item)
        {
            FormUserAuthorizationEntity response = null;
            try
            {
                item.UserId = User.Identity.GetUserId();
                response = await repository.Create(item);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return Content(HttpStatusCode.OK, response);
        }

        [HttpPut]
        public async Task<FormUserAuthorizationEntity> Update(Guid id, FormUserAuthorizationEntity item)
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