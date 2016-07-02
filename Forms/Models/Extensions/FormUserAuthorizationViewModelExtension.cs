using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FormUserAuthorizationViewModel = Forms.Models.FormUserAuthorizationViewModel;
using FormUserAUthorizationEntity = Forms.FormUserAuthorization;

namespace Forms.Models.Extensions
{
    public static class FormUserAuthorizationViewModelEitemtension
    {
        public static FormUserAUthorizationEntity ToEntity(this FormUserAuthorizationViewModel item)
        {
            var model = new FormUserAUthorizationEntity()
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
                ModifiedDateTime = item.ModifiedDateTime
                
            };

            return model;
        }

        public static FormUserAuthorizationViewModel ToViewModel(this FormUserAUthorizationEntity item)
        {
            var model = new FormUserAuthorizationViewModel()
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
                AspNetUser = item.AspNetUser != null ? item.AspNetUser.ToViewModel() : null,
                Form = item.Form != null ? item.Form.ToViewModel() : null
            };

            return model;
        }
    }
}