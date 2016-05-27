using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Forms.Migrations
{
    public class Configuration : IDatabaseInitializer<FormsEntities>
    {
        public void InitializeDatabase(FormsEntities context)
        {
            using (context = new FormsEntities())
            {
                if (!context.Database.Exists())
                {
                    context.Database.Create();
                    LoadFormDetailsTypes(context);
                    context.Database.Connection.Open();
                    context.SaveChanges();
                    context.Database.Connection.Close();
                }
            }
        }

        public void LoadFormDetailsTypes(FormsEntities context)
        {
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Password"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Phone Number"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Text"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Number"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Radio"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Drop Down"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Checkbox"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Date"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Picture"
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "File"
            });
        }
    }
}