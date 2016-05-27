using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FormDetailEntity = Forms.FormDetail;

namespace Forms.Repositories
{
    public class FormDetailsRepository
    {
        FormsEntities context;
        public FormDetailsRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<FormDetailEntity> Search()
        {
            return context.FormDetails;
        }

        public async Task<FormDetailEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetails.Find(id);
                return entity;
            }
        }

        public async Task<FormDetailEntity> Create(FormDetailEntity item)
        {
            using (var context = new FormsEntities())
            {
                item.Id = Guid.NewGuid();
                item.CreatedDateTime = DateTime.Now;
                var entity = context.FormDetails.Add(item);
                context.SaveChanges();
                return entity;
            }
        }

        public async Task<FormDetailEntity> Update(Guid id, FormDetailEntity item)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetails.Find(id);
                entity.FormId = item.FormId;
                entity.Name = item.Name;
                entity.Description = item.Description;
                entity.Title = item.Title;
                entity.FormDetailsTypeId = item.FormDetailsTypeId;
                entity.FormDetailsOptionId = item.FormDetailsOptionId;
                entity.ModifiedDateTime = DateTime.Now;
                context.SaveChanges();
                return entity;
            }
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormDetails.Find(id);
                context.FormDetails.Remove(entity);
                context.SaveChanges();
            }
        }
    }
}