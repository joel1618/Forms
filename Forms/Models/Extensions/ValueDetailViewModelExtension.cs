using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using ValueDetailEntity = Forms.ValueDetail;
using ValueDetailViewModel = Forms.Models.ValueDetailViewModel;

namespace Forms.Models.Extensions
{
    public static class ValueDetailViewModelExtension
    {
        public static ValueDetailEntity ToEntity(this ValueDetailViewModel item)
        {
            var model = new ValueDetailEntity();
            model.Id = item.Id;
            model.FormDetailsId = item.FormDetailsId;
            model.IsSent = item.IsSent;
            model.SyncDateTime = item.SyncDateTime.HasValue ? item.SyncDateTime.Value : new Nullable<DateTime>();
            model.ValueId = item.ValueId;
            model.Value = item.Value;
            model.ValuePicture = item.ValuePicture != null ? Encoding.ASCII.GetBytes(item.ValuePicture) : null;
            model.CreatedDateTime = item.CreatedDateTime;
            model.ModifiedDateTime = item.ModifiedDateTime.HasValue ? item.ModifiedDateTime.Value : new Nullable<DateTime>();
            model.UserId = item.UserId;
            return model;
        }

        public static ValueDetailViewModel ToViewModel(this ValueDetailEntity item)
        {
            var model = new ValueDetailViewModel();
            model.Id = item.Id;
            model.FormDetailsId = item.FormDetailsId;
            model.IsSent = item.IsSent;
            model.SyncDateTime = item.SyncDateTime.HasValue ? item.SyncDateTime.Value : new Nullable<DateTime>();
            model.ValueId = item.ValueId;
            model.Value = item.Value;
            model.ValuePicture = item.ValuePicture != null && item.ValuePicture.Length > 0 ? ASCIIEncoding.ASCII.GetString(item.ValuePicture) : "";
            model.CreatedDateTime = item.CreatedDateTime;
            model.ModifiedDateTime = item.ModifiedDateTime.HasValue ? item.ModifiedDateTime.Value : new Nullable<DateTime>();
            model.UserId = item.UserId;

            return model;
        }

        public static byte[] ToByteArray(this System.Drawing.Image item)
        {
            if (item == null)
                return null;
            MemoryStream ms = new MemoryStream();
            item.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
            return ms.ToArray();
        }

        public static Image ToImage(this byte[] item)
        {
            if (item == null)
                return null;
            MemoryStream ms = new MemoryStream(item);
            Image returnImage = Image.FromStream(ms);
            return returnImage;
        }
    }
}