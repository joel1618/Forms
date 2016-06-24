(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormAuthorizationController', ['$scope', '$uibModal', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'ValueReadService', 'FormUserAuthorizationService',
    function controller($scope, $uibModal, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailsService, ValueReadService, FormUserAuthorizationService) {
            var id = $routeParams.id.toLowerCase();
            var pageSize = 1000;
            var page = 0;
            $scope.email = null;

            $scope.Search = function () {
                var predicate = new breeze.Predicate('FormId', '==', id);
                FormUserAuthorizationService.Search(predicate, id, page, pageSize, false).then(function (data) {
                    $scope.Items = data;
                });
            }
            $scope.Search();

            $scope.Delete = function (item) {
                FormUserAuthorizationService.Delete(item.Id).then(function (data) {
                    $scope.Search();
                });
            }

            $scope.Update = function (item) {
                FormUserAuthorizationService.Update(item.Id, item).then(function (data) {
                    $scope.Search();
                });
            }

            $scope.Create = function () {
                //TODO: Make sure user doesn't already exist.  unique key constraint
                //TODO: Get UserId to pass down to server.

                var item = { 'FormId': id };
                FormUserAuthorizationService.Create(item).then(function (data) {
                    $scope.Search();
                });
            }

            $scope.Select = function (item) {

            }
    }]);
})(moment);