//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Forms
{
    using System;
    using System.Collections.Generic;
    
    public partial class FormDetailsOption
    {
        public System.Guid Id { get; set; }
        public System.Guid FormDetailsId { get; set; }
        public string Name { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<System.DateTime> SyncDateTime { get; set; }
    
        public virtual FormDetail FormDetail { get; set; }
    }
}
