using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FormDetailOptionEntity = Forms.FormDetailsOption;
using FormDetailOptionViewModel = Forms.Models.FormDetailOptionViewModel;

namespace Forms.Models.Extensions
{
    public static class FormDetailOptionViewModelExtension
    {
        public static FormDetailOptionEntity ToEntity(this FormDetailOptionViewModel item)
        {
            var model = new FormDetailOptionEntity()
            {
                FormDetailsId = item.FormDetailsId,
                Id = item.Id,
                Name = item.Name
            };

            return model;
        }

        public static FormDetailOptionViewModel ToViewModel(this FormDetailOptionEntity item)
        {
            var model = new FormDetailOptionViewModel()
            {
                FormDetailsId = item.FormDetailsId,
                Id = item.Id,
                Name = item.Name
            };

            return model;
        }
    }
}