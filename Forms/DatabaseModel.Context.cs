﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class FormsEntities : DbContext
    {
        public FormsEntities()
            : base("name=FormsEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUsersInfo> AspNetUsersInfoes { get; set; }
        public virtual DbSet<Form> Forms { get; set; }
        public virtual DbSet<FormDetail> FormDetails { get; set; }
        public virtual DbSet<FormDetailsOption> FormDetailsOptions { get; set; }
        public virtual DbSet<FormDetailsType> FormDetailsTypes { get; set; }
        public virtual DbSet<Value> Values { get; set; }
        public virtual DbSet<ValueDetail> ValueDetails { get; set; }
        public virtual DbSet<FormUserAuthorization> FormUserAuthorizations { get; set; }
    }
}
