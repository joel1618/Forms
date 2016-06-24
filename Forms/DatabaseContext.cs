using Forms.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Forms
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext()
            : base("BreezeMetadata")
        {
            // Prevent attempt to initialize a database for this context
            Database.SetInitializer<DatabaseContext>(null);
        }
        static DatabaseContext()
        {
            // Prevent attempt to initialize a database for this context
            Database.SetInitializer<DatabaseContext>(null);
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new ConflictDtoConfiguration());
        }

        //public DbSet<Form> Form { get; set; }
        //public DbSet<FormDetail> FormDetails { get; set; }
        public DbSet<FormViewModel> FormViewModel { get; set; }
        public DbSet<FormDetailViewModel> FormDetailsViewModel { get; set; }
        public DbSet<FormDetailOptionViewModel> FormDetailsOptionViewModel { get; set; }
        public DbSet<FormUserAuthorization> FormUserAuthorization { get; set; }
    }
}