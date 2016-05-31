(function () {
    "use strict";
    angular.module('Services')
    .service('FormCacheService', ['$http', '$q', 'breeze', 'breezeservice', 'localStorageService', 'FormService',
        function ($http, $q, breeze, breezeservice, localStorageService, FormService) {
        var _self = this;
        this.deferredRequest = null;

        this.Get = function(id)
        {
            var deferred = $q.defer();
            FormService.Get(id).then(function (data) {
                if(localStorageService.isSupported)
                {
                    var item = localStorageService.get('Form ' + id);
                    if(item != null){                        
                        if (data.ModifiedDateTime > item.ModifiedDateTime) {
                            localStorageService.set('Form ' + id, data);
                        }
                    }
                    else {
                        localStorageService.set('Form ' + id, data);
                    }
                    deferred.resolve(localStorageService.get('Form ' + id));
                }
            }, function (error) {
                if(localStorageService.isSupported)
                {
                    deferred.resolve(localStorageService.get('Form ' + id));
                }
                deferred.resolve(null);
            });
            return deferred.promise;
        }
    }]);
})();