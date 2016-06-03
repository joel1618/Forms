(function () {
    "use strict";
    angular.module('Services')
    .service('FormDetailsCacheService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
            var _self = this;
            var database = new localStorageDB("FormsDatabase", localStorage);
            this.deferredRequest = null;

            this.Search = function (predicate, page, pageSize, cancelExistingSearch) {
                cancelExistingSearch = cancelExistingSearch || false;

                if (this.deferredRequest !== null && cancelExistingSearch) {
                    this.deferredRequest.reject("Cancelled Search Request.");
                    this.deferredRequest = null;
                }
                var deferred = $q.defer();

                var items = database.queryAll("FormDetails", { query: predicate, start: page * pageSize, limit: pageSize, sort: [["CreatedDateTime", "DESC"]] });
                debugger;
                if (items != null) {
                    deferred.resolve(items);
                    _self.deferredRequest = null;
                }
                else {
                    deferred.resolve(null);
                    _self.deferredRequest = null;
                }

                this.deferredRequest = deferred;

                return deferred.promise;
            };

            this.Get = function (id) {
                var deferred = $q.defer();

                var items = database.queryAll("FormDetails", { query: function (row) { if (row.Id == id) { return true; } else { return false; } }, limit: 1 });
                if (items != null) {
                    deferred.resolve(items[0]);
                }
                else {
                    deferred.resolve(null);
                }

                return deferred.promise;
            };

            this.Create = function (item) {
                var deferred = $q.defer();

                $http.post('/breeze/FormDetailsApi/Create', item)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    if (response.statusText.length > 0) {
                        deferred.reject(response.statusText);
                    } else {
                        deferred.reject("Failed to create the new requirement.");
                    }
                });

                return deferred.promise;
            };

            this.Update = function (id, item) {
                var deferred = $q.defer();

                $http.put('/FormsApi/Update/' + id, item)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    if (response.statusText.length > 0) {
                        deferred.reject(response);
                    } else {
                        deferred.reject("Failed to update the requirement.");
                    }
                });

                return deferred.promise;
            }

            this.Delete = function (id) {
                var deferred = $q.defer();

                $http.delete('/breeze/FormDetailsApi/Delete/' + id)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    if (response.statusText.length > 0) {
                        deferred.reject(response);
                    } else {
                        deferred.reject("Failed to update the requirement.");
                    }
                });

                return deferred.promise;
            }
        }]);
})();