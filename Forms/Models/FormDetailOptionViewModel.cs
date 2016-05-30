using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Models
{
    public class FormDetailOptionViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid FormDetailsId { get; set; }
        public string Name { get; set; }
    }
}