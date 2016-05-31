(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailService) {
        var pageSize = 10;
        $scope.id = $routeParams.id;
    }]);
})(moment);