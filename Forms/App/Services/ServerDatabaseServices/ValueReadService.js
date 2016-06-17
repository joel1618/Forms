(function () {
    "use strict";
    angular.module('Services')
    .service('ValueReadService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
            var _self = this;
            this.deferredRequest = null;

            this.Search = function (predicate, formId, page, pageSize, cancelExistingSearch) {
                cancelExistingSearch = cancelExistingSearch || false;

                if (this.deferredRequest !== null && cancelExistingSearch) {
                    this.deferredRequest.reject("Cancelled Search Request.");
                    this.deferredRequest = null;
                }
                var deferred = $q.defer();
                $http({
                    method: 'Get',
                    url: 'api/v1/ValueReadApi/Search/formid=' + formId + '/page=' + page + '/pageSize=' + pageSize,
                }).success(function (data, status, headers, config) {
                     deferred.resolve(data);
                    _self.deferredRequest = null;
                }).error(function (msg, code) {
                    deferred.reject(msg);
                    _self.deferredRequest = null;
                });

                this.deferredRequest = deferred;

                return deferred.promise;
            };

            }]);
})();