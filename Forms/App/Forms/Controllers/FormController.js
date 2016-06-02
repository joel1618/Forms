(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormCacheService', 'FormDetailsCacheService', 'FormDetailsTypeCacheService','FormDetailsOptionsCacheService','ValueCacheService','ValueDetailsCacheService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormCacheService, FormDetailsCacheService, FormDetailsTypeCacheService, FormDetailsOptionsCacheService, ValueCacheService, ValueDetailCacheService) {
        var pageSize = 10;
        $scope.id = $routeParams.id;
        FormCacheService.Get($scope.id).then(function(data){
            $scope.Form = data;
        });
    }]);
})(moment);