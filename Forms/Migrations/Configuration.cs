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
                Name = "Password",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Phone Number",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Text",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Number",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Radio",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Drop Down",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Checkbox",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Date",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Picture",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "File",
                CreatedDateTime = DateTime.Now
            });
            context.FormDetailsTypes.Add(new FormDetailsType()
            {
                Id = Guid.NewGuid(),
                Name = "Text Area",
                CreatedDateTime = DateTime.Now
            });
        }
    }
}