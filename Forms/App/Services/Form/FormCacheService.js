(function () {
    "use strict";
    angular.module('Services')
    .service('FormCacheService', ['$http', '$q', 'breeze', 'breezeservice', 'FormService',
        function ($http, $q, breeze, breezeservice, FormService) {
        var _self = this;
        this.deferredRequest = null;

        this.Get = function(id)
        {
            var deferred = $q.defer();
            var database = new localStorageDB("FormsDatabase", localStorage);
            $http({
                method: 'Get',
                url: '/breeze/FormApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                var item = database.queryAll("Form", { query: function (row) { if (row.Id == Id) { return true; } else { return false; } }, limit: 1 });
                if (item != null) {
                    if (data.ModifiedDateTime > item.ModifiedDateTime) {
                        //Update
                        database.insertOrUpdate("Form", { Id: Id }, {
                            Name: item.Name,
                            Description: item.Description,
                            PublishUrl: item.PublishUrl,
                            UserId: item.UserId,
                            CreatedDateTime: item.CreatedDateTime,
                            ModifiedDateTime: item.ModifiedDateTime
                        });
                        database.commit();
                    }
                }
                else {
                    //Create
                    database.insertOrUpdate("Form", { Id: Id }, {
                        Name: item.Name,
                        Description: item.Description,
                        PublishUrl: item.PublishUrl,
                        UserId: item.UserId,
                        CreatedDateTime: item.CreatedDateTime,
                        ModifiedDateTime: item.ModifiedDateTime
                    });
                    database.commit();
                }
                item = database.queryAll("Form", { query: function (row) { if (row.Id == Id) { return true; } else { return false; } }, limit: 1 });
                deferred.resolve(item);
            }).error(function (msg, code) {
                var item = database.queryAll("Form", { query: function (row) { if (row.Id == Id) { return true; } else { return false; } }, limit: 1 });
                if (item != null) {
                    deferred.resolve(item);
                }
                deferred.reject(msg);
            });

            return deferred.promise;
        }
    }]);
})();