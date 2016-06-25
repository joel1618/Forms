using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FormEntity = Forms.Form;
using FormViewModel = Forms.Models.FormViewModel;

namespace Forms.Models.Eitemtensions
{
    public static class FormViewModelExtemtension
    {
        public static FormEntity ToEntity(this FormViewModel item)
        {
            var model = new FormEntity()
            {
                Description = item.Description,
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,
                Name = item.Name,
                UserId = item.UserId,
                PublishUrl = item.PublishUrl
            };

            return model;
        }

        public static FormViewModel ToViewModel(this FormEntity item)
        {
            var model = new FormViewModel()
            {
                Description = item.Description,
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,
                Name = item.Name,
                UserId = item.UserId,
                PublishUrl = item.PublishUrl
            };

            return model;
        }
    }
}