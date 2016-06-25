using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FormUserAuthorizationEntity = Forms.FormUserAuthorization;

namespace Forms.Repositories
{
    public class FormUserAuthorizationRepository
    {
        FormsEntities context;
        public FormUserAuthorizationRepository()
        {
            this.context = new FormsEntities();
        }
        public IQueryable<FormUserAuthorizationEntity> Search()
        {
            return context.FormUserAuthorizations;
        }

        public async Task<FormUserAuthorizationEntity> Get(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormUserAuthorizations.Find(id);
                return entity;
            }
        }

        public async Task<FormUserAuthorizationEntity> Create(FormUserAuthorizationEntity item)
        {
            item.Id = Guid.NewGuid();
            item.CreatedDateTime = DateTime.Now;
            var entity = context.FormUserAuthorizations.Add(item);
            context.SaveChanges();
            return entity;
        }

        public async Task<FormUserAuthorizationEntity> Update(Guid id, FormUserAuthorizationEntity item)
        {
            var entity = context.FormUserAuthorizations.Find(id);

            entity.IsCreateData = item.IsCreateData;
            entity.IsUpdateData = item.IsUpdateData;
            entity.IsReadData = item.IsReadData;
            entity.IsDeleteData = item.IsDeleteData;

            entity.IsCreateForm = item.IsCreateForm;
            entity.IsUpdateForm = item.IsUpdateForm;
            entity.IsReadForm = item.IsReadForm;
            entity.IsDeleteForm = item.IsDeleteForm;

            entity.ModifiedDateTime = DateTime.Now;
            context.SaveChanges();
            return entity;
        }

        public async void Delete(Guid id)
        {
            using (var context = new FormsEntities())
            {
                var entity = context.FormUserAuthorizations.Find(id);
                if (entity != null)
                {
                    context.FormUserAuthorizations.Remove(entity);
                    context.SaveChanges();
                }
            }
        }
    }
}