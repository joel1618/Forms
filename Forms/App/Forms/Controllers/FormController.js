(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'FormCacheService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailService, FormCacheService) {
        var pageSize = 10;
        $scope.id = $routeParams.id;
        FormCacheService.Get($scope.id).then(function(data){
            $scope.Form = data;
        });
    }]);
})(moment);