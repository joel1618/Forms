using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FormDetailEntity = Forms.FormDetail;
using FormDetailViewModel = Forms.Models.FormDetailViewModel;

namespace Forms.Models.Extensions
{
    public static class FormDetailViewModelExtension
    {
        public static FormDetailEntity ToEntity(this FormDetailViewModel item)
        {
            var model = new FormDetailEntity()
            {
                Description = item.Description,
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,
                Name = item.Name,
                UserId = item.UserId,
                FormDetailsTypeId = item.FormDetailsTypeId,
                FormId = item.FormId,
                IsRequired = item.IsRequired,
                Title = item.Title
            };

            return model;
        }

        public static FormDetailViewModel ToViewModel(this FormDetailEntity item)
        {
            var model = new FormDetailViewModel()
            {
                Description = item.Description,
                Id = item.Id,
                CreatedDateTime = item.CreatedDateTime,
                ModifiedDateTime = item.ModifiedDateTime,
                Name = item.Name,
                UserId = item.UserId,
                FormDetailsTypeId = item.FormDetailsTypeId,
                FormId = item.FormId,
                IsRequired = item.IsRequired,
                Title = item.Title
            };

            return model;
        }
    }
}