(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormAuthorizationController', ['$scope', '$uibModal', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'ValueReadService', 'FormUserAuthorizationService', 'AspNetUsersService',
    function controller($scope, $uibModal, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailsService, ValueReadService, FormUserAuthorizationService, AspNetUsersService) {
            var id = $routeParams.id;
            var pageSize = 100;
            var page = 0;
            $scope.email = null;

            $scope.Search = function () {
                var predicate = new breeze.Predicate('FormId', '==', id);
                FormUserAuthorizationService.Search(predicate, page, pageSize, false).then(function (data) {
                    debugger;
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
                var predicate = new breeze.Predicate('Email', '==', $scope.email);
                AspNetUsersService.Search(predicate, 0, 1, false).then(function(data){ 
                    if (data.length > 0) {
                        var item = { 'FormId': id, 'UserId' :  data[0].Id };
                        FormUserAuthorizationService.Create(item).then(function (data) {
                            $scope.Search();
                        });
                    }
                    else {
                        alert("No user was found.");
                    };
                });
            }
    }]);
})(moment);