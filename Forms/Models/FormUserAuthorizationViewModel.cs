using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class FormUserAuthorizationViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid FormId { get; set; }
        public string UserId { get; set; }
        public bool IsCreateData { get; set; }
        public bool IsReadData { get; set; }
        public bool IsUpdateData { get; set; }
        public bool IsDeleteData { get; set; }
        public bool IsCreateForm { get; set; }
        public bool IsReadForm { get; set; }
        public bool IsUpdateForm { get; set; }
        public bool IsDeleteForm { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public System.DateTime CreatedDateTime { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }
        public virtual FormViewModel Form { get; set; }
    }
}