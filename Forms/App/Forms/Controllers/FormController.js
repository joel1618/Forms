(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormCacheService', 'FormDetailsCacheService', 'FormDetailsTypeCacheService','FormDetailsOptionsCacheService','ValueCacheService','ValueDetailsCacheService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormCacheService, FormDetailsCacheService, FormDetailsTypeCacheService, FormDetailsOptionsCacheService, ValueCacheService, ValueDetailCacheService) {
        var pageSize = 10;
        var id = $routeParams.id.toLowerCase();
        FormCacheService.Get(id).then(function(data){
            $scope.Form = data;
        });
        var predicate = function(row) { if (row.FormId == id) { return true; } else { return false; } }
        FormDetailsCacheService.Search(predicate, 0, 1, false).then(function(data){
            $scope.FormDetails = data;
        });
    }]);
})(moment);