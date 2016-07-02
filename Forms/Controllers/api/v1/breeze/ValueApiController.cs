using Breeze.WebApi2;
using Forms.Models;
using Forms.Models.Extensions;
using Forms.Repositories;
using Forms.Services;
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
        AspNetUsersRepository userRepository;
        AuthorizationService authorizationService;
        FormUserAuthorizationRepository formUserAuthorizationRepository;
        private AspNetUser user;

        public ValueApiController()
        {
            this.repository = new ValueRepository();
            this.userRepository = new AspNetUsersRepository();
            this.authorizationService = new AuthorizationService();
            this.formUserAuthorizationRepository = new FormUserAuthorizationRepository();
            var currentUserId = User.Identity.GetUserId();
            user = userRepository.Search().Where(e => e.Id == currentUserId).FirstOrDefault();
        }
        [HttpGet]
        public IQueryable<ValueViewModel> Search()
        {
            var formIds = formUserAuthorizationRepository.Search().Where(e => e.UserId == user.Id && e.IsReadData == true).Select(x => x.FormId).ToList();
            return repository.Search().Where(e => e.UserId == user.Id || formIds.Contains(e.Id) || e.Form.IsPublic == true).Select(x => new ValueViewModel()
            {
                Id = x.Id,
                FormId = x.FormId,
                CreatedDateTime = x.CreatedDateTime,
                ModifiedDateTime = x.ModifiedDateTime,
                Form = new FormViewModel()
                {
                    Id = x.Form.Id,
                    Name = x.Form.Name
                },
                ValueDetails = x.ValueDetails.Select(y => new ValueDetailViewModel()
                {
                    Id = y.Id,
                    Value = y.Value,                    
                    CreatedDateTime = y.CreatedDateTime,
                    FormDetailsId = y.FormDetailsId,
                    FormDetail = new FormDetailViewModel()
                    {
                        Id = y.FormDetail.Id,
                        Name = y.FormDetail.Name,
                        FormDetailsType = new FormDetailTypeViewModel()
                        {
                            Id = y.FormDetail.FormDetailsType.Id,
                            Name = y.FormDetail.FormDetailsType.Name
                        }
                    }
                })
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            ValueViewModel model = null;
            try
            {
                var record = await repository.Get(id);
                if (!authorizationService.IsAuthorized(record.FormId, user.Email, AuthorizationService.AuthorizationType.IsRead, AuthorizationService.EndpointType.Data))
                {
                    return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
                }
                model = record.ToViewModel();
                return Content(HttpStatusCode.OK, model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(ValueViewModel item)
        {
            ValueViewModel model = null;
            try
            {
                if (!authorizationService.IsAuthorized(item.FormId, user.Email, AuthorizationService.AuthorizationType.IsCreate, AuthorizationService.EndpointType.Data))
                {
                    return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
                }
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
        public async Task<IHttpActionResult> Update(Guid id, ValueViewModel item)
        {
            if (!authorizationService.IsAuthorized(item.FormId, user.Email, AuthorizationService.AuthorizationType.IsUpdate, AuthorizationService.EndpointType.Data))
            {
                return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
            }
            var record = await repository.Update(id, item.ToEntity());
            var model = record.ToViewModel();
            return Content(HttpStatusCode.OK, model);
        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            var item = await repository.Get(id);
            if (!authorizationService.IsAuthorized(item.FormId, user.Email, AuthorizationService.AuthorizationType.IsDelete, AuthorizationService.EndpointType.Data))
            {
                return Content(HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
            }
            else
            {
                repository.Delete(id);
                return Content(HttpStatusCode.OK, "");
            }
        }
    }
}