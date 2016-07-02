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
using ValueDetailEntity = Forms.ValueDetail;

namespace Forms.Controllers.api.v1.breeze
{
    [BreezeController]
    public class ValueDetailsApiController : ApiController
    {
        ValueDetailsRepository repository;
        AspNetUsersRepository userRepository;
        AuthorizationService authorizationService;
        public ValueDetailsApiController()
        {
            this.repository = new ValueDetailsRepository();
            this.userRepository = new AspNetUsersRepository();
            this.authorizationService = new AuthorizationService();
        }
        [HttpGet]
        public IQueryable<ValueDetailViewModel> Search()
        {
            return repository.Search().Select(x => new ValueDetailViewModel()
            {
                Id = x.Id,
                ValueId = x.ValueId,
                FormDetailsId = x.FormDetailsId,
                Value = x.Value
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            ValueDetailViewModel model = null;
            try
            {
                var record = await repository.Get(id);
                var user = userRepository.Search().Where(e => e.Id == User.Identity.GetUserId()).FirstOrDefault();
                if (!authorizationService.IsAuthorized(record.FormDetail.FormId, user.Email, AuthorizationService.AuthorizationType.IsRead, AuthorizationService.EndpointType.Data))
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
        public async Task<IHttpActionResult> Create(ValueDetailViewModel item)
        {
            ValueDetailViewModel model = null;
            try
            {
                var user = userRepository.Search().Where(e => e.Id == User.Identity.GetUserId()).FirstOrDefault();
                if (!authorizationService.IsAuthorized(item.FormDetail.FormId, user.Email, AuthorizationService.AuthorizationType.IsCreate, AuthorizationService.EndpointType.Data))
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
        public async Task<IHttpActionResult> Update(Guid id, ValueDetailViewModel item)
        {
            var user = userRepository.Search().Where(e => e.Id == User.Identity.GetUserId()).FirstOrDefault();
            if (!authorizationService.IsAuthorized(item.FormDetail.FormId, user.Email, AuthorizationService.AuthorizationType.IsUpdate, AuthorizationService.EndpointType.Data))
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
            var user = userRepository.Search().Where(e => e.Id == User.Identity.GetUserId()).FirstOrDefault();
            if (!authorizationService.IsAuthorized(item.FormDetail.FormId, user.Email, AuthorizationService.AuthorizationType.IsUpdate, AuthorizationService.EndpointType.Data))
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