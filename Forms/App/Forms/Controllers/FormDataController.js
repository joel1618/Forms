(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormDataController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'ValueReadService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailService, ValueReadService) {
        var id = $routeParams.id.toLowerCase();
        var pageSize = 100;
        var page = 0;

        ValueReadService.Search(null, page, pageSize, false).then(function (data) {
            $scope.Items = data;
        });

        }]);

})(moment);