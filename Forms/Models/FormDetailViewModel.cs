using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class FormDetailViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid FormId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public System.Guid FormDetailsTypeId { get; set; }
        public string UserId { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public System.DateTime ModifiedDateTime { get; set; }
    }
}