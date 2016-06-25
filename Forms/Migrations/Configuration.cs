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
                    AddUniqueKeyFormDetails(context);
                    AddUniqueKeyFormUserAuthorization(context);
                    context.SaveChanges();
                    context.Database.Connection.Close();
                }
            }
        }

        public void AddUniqueKeyFormUserAuthorization(FormsEntities context)
        {
            string query = @"

            /****** Object:  Index [IX_FormUserAuthorization]    Script Date: 6/25/2016 3:32:40 PM ******/
            ALTER TABLE [dbo].[FormUserAuthorization] ADD  CONSTRAINT [IX_FormUserAuthorization] UNIQUE NONCLUSTERED 
            (
	            [UserId] ASC,
	            [FormId] ASC
            )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
            
            ";
            context.Database.ExecuteSqlCommand(query);
        }

        public void AddUniqueKeyFormDetails(FormsEntities context)
        {
            string query = @"

            /****** Object:  Index [IX_FormDetails]    Script Date: 6/25/2016 3:33:29 PM ******/
            ALTER TABLE [dbo].[FormDetails] ADD  CONSTRAINT [IX_FormDetails] UNIQUE NONCLUSTERED 
            (
	            [FormId] ASC,
	            [Name] ASC
            )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
            ";
            context.Database.ExecuteSqlCommand(query);
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