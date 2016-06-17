using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class ValueDetailViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid ValueId { get; set; }
        public System.Guid FormDetailsId { get; set; }
        public string Value { get; set; }
        public string ValuePicture { get; set; }
        public string UserId { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public bool IsSent { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<System.DateTime> SyncDateTime { get; set; }
        public FormDetailViewModel FormDetail { get; set; }
    }
}