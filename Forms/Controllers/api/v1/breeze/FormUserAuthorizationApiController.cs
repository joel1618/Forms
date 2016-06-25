using Breeze.WebApi2;
using Forms.Models;
using Forms.Models.Eitemtensions;
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
using FormUserAuthorizationViewModel = Forms.Models.FormUserAuthorizationViewModel;

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
        public IQueryable<FormUserAuthorizationViewModel> Search()
        {
            var response = repository.Search();
            return response.Select(item => new FormUserAuthorizationViewModel()
            {
                Id = item.Id,
                FormId = item.FormId,
                IsCreateData = item.IsCreateData,
                IsReadData = item.IsReadData,
                IsUpdateData = item.IsUpdateData,
                IsDeleteData = item.IsDeleteData,
                IsCreateForm = item.IsCreateForm,
                IsDeleteForm = item.IsDeleteForm,
                IsReadForm = item.IsReadForm,
                IsUpdateForm = item.IsUpdateForm,
                UserId = item.UserId,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,
                AspNetUser = item.AspNetUser,
                Form = new FormViewModel()
                {
                    Description = item.Form.Description,
                    Id = item.Form.Id,
                    CreatedDateTime = item.Form.CreatedDateTime,
                    ModifiedDateTime = item.Form.ModifiedDateTime,
                    Name = item.Form.Name,
                    UserId = item.Form.UserId,
                    PublishUrl = item.Form.PublishUrl
                }
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var response = await repository.Get(id);
            return Content(HttpStatusCode.OK, response.ToViewModel());
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(FormUserAuthorizationViewModel item)
        {
            FormUserAuthorizationEntity response = null;
            try
            {
                item.UserId = User.Identity.GetUserId();
                response = await repository.Create(item.ToEntity());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return Content(HttpStatusCode.OK, response.ToViewModel());
        }

        [HttpPut]
        public async Task<FormUserAuthorizationViewModel> Update(Guid id, FormUserAuthorizationViewModel item)
        {
            var entity = item.ToEntity();
            var response = await repository.Update(id, entity);
            return response.ToViewModel();
        }

        [HttpDelete]
        public async void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}