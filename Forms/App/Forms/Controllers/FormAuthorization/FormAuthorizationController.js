(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormDataController', ['$scope', '$uibModal', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'ValueReadService', 'FormUserAuthorizationService',
    function controller($scope, $uibModal, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailsService, ValueReadService, FormUserAuthorizationService) {
            var id = $routeParams.id.toLowerCase();
            var pageSize = 1000;
            var page = 0;

            $scope.Search = function () {
                var predicate = new breeze.Predicate('FormId', '==', id);
                FormUserAuthorizationService.Search(predicate, id, page, pageSize, false).then(function (data) {
                    $scope.Items = data;
                });
            }
            $scope.Search();


             }]);
})(moment);