(function () {
    "use strict";
    angular.module('Services')
    .service('ValueCacheService', ['$http', '$q', 'breeze', 'breezeservice',
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
                if (!database.tableExists("Value")) {
                    deferred.resolve(null);
                    _self.deferredRequest = null;
                }
                else {
                    var items = database.queryAll("Value", { query: predicate, start: page * pageSize, limit: pageSize, sort: [["CreatedDateTime", "DESC"]] });
                    if (items != null) {
                        deferred.resolve(items);
                        _self.deferredRequest = null;
                    }
                    else {
                        deferred.resolve(null);
                        _self.deferredRequest = null;
                    }
                }

                this.deferredRequest = deferred;

                return deferred.promise;
            };

            this.Get = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/breeze/ValueApi/Get/' + id,
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.Create = function (item) {
                var database = new localStorageDB("FormsDatabase", localStorage);
                var deferred = $q.defer();

                item.Id = guid();
                item.ReferenceId = item.Id;
                database.insertOrUpdate("Value", { Id: item.Id }, item);
                database.commit();

                deferred.resolve(item);

                return deferred.promise;
            };

            this.Update = function (id, item) {
                var deferred = $q.defer();

                $http.put('/ValueApi/Update/' + id, item)
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

                $http.delete('/breeze/ValueApi/Delete/' + id)
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

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                      .toString(16)
                      .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();
            }
        }]);
})();