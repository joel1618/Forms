using Forms.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forms.Services
{
    public class AuthorizationService
    {
        FormUserAuthorizationRepository formUserAuthorizationRepository;
        FormRepository formRepository;
        AspNetUsersRepository userRepository;
        public AuthorizationService()
        {
            this.formUserAuthorizationRepository = new FormUserAuthorizationRepository();
            this.formRepository = new FormRepository();
            this.userRepository = new AspNetUsersRepository();
        }

        public enum AuthorizationType
        {
            IsCreate, IsRead, IsUpdate, IsDelete
        };

        public enum EndpointType
        {
            Form, Data
        }

        public bool IsAuthorized(Guid formId, string email, AuthorizationType authorizationType, EndpointType endpointType)
        {
            //Check the base case.  The creator of the form can do everything.
            var form = formRepository.Get(formId).Result;
            var user = userRepository.Search().Where(e => e.Email == email).ToList();
            if(form.UserId == user[0].Id)
            {
                return true;
            }
            //Otherwise check the who is authorized to do what on this form.
            var credentials = formUserAuthorizationRepository.Search().Where(e => e.FormId == formId && e.AspNetUser.Email == email).ToList();
            if(credentials.Count() > 0)
            {
                if(endpointType == EndpointType.Form)
                {
                    if (authorizationType == AuthorizationType.IsCreate)
                    {
                        return credentials[0].IsCreateForm;
                    }
                    else if(authorizationType == AuthorizationType.IsRead)
                    {
                        return credentials[0].IsReadForm;
                    }
                    else if(authorizationType == AuthorizationType.IsUpdate)
                    {
                        return credentials[0].IsUpdateForm;
                    }
                    else
                    {
                        return credentials[0].IsDeleteForm;
                    }
                }
                else
                {
                    if (authorizationType == AuthorizationType.IsCreate)
                    {
                        return credentials[0].IsCreateData;
                    }
                    else if (authorizationType == AuthorizationType.IsRead)
                    {
                        return credentials[0].IsReadData;
                    }
                    else if (authorizationType == AuthorizationType.IsUpdate)
                    {
                        return credentials[0].IsUpdateData;
                    }
                    else
                    {
                        return credentials[0].IsDeleteData;
                    }
                }
            }
            else
            {
                return false;
            }
        }
    }
}