(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormController', ['$scope', '$rootScope', '$routeParams', '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze',
         'LocalDatabaseService','FormCacheService', 'FormDetailsCacheService', 'FormDetailsTypeCacheService', 'FormDetailsOptionsCacheService', 'ValueCacheService', 'ValueDetailsCacheService',
    function controller($scope, $rootScope, $routeParams, $http, $q, $location, $timeout, breezeservice, breeze,
        LocalDatabaseService, FormCacheService, FormDetailsCacheService, FormDetailsTypeCacheService, FormDetailsOptionsCacheService, ValueCacheService, ValueDetailsCacheService) {
        LocalDatabaseService.CreateDatabase();
        $scope.IsSyncing = true;
        $scope.IsInit = false;
        var id = $routeParams.id.toLowerCase();
        var pageSize = 10;
        $rootScope.$on('IsSyncing', function (event, args) {
            $scope.IsSyncing = args.IsSyncing;
            if(!args.IsSyncing){
                $scope.Init();
            }
        });
        $scope.Init = function () {
            if (!$scope.IsInit) {
                $scope.IsInit = true;
                $scope.SelectedTempValueDetail = null; $scope.SelectedFormDetailsType = null;
                $scope.tempValue = { Id: null, ReferenceId: null, FormId: id, UserId: null, Latitude: null, Longitude: null, IsSent: false, IsDeleted: false, CreatedDateTime: null, ModifiedDateTime: null, SyncDateTime: null };
                $scope.tempValueDetail = { Id: null, ReferenceId: null, ValueId: null, FormDetailsId: null, Value: null, DateValue: null, Name: null, UserId: null, IsSent: false, IsDeleted: false, IsRequired: false, CreatedDateTime: null, ModifiedDateTime: null, SyncDateTime: null };
                $scope.tempValueDetails = [];
                FormCacheService.Get(id).then(function (data) {
                    $scope.Form = data;
                });
                var predicate = function (row) { if (row.FormId == id) { return true; } else { return false; } }
                FormDetailsCacheService.Search(predicate, 0, pageSize, false).then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.tempValueDetail.FormDetailsId = value.Id;
                        $scope.tempValueDetail.Name = value.Name;
                        $scope.tempValueDetail.Description = value.Description;
                        $scope.tempValueDetail.IsRequired = value.IsRequired;
                        $scope.tempValueDetails.push(angular.copy($scope.tempValueDetail));
                    });
                    if ($scope.tempValueDetails.length > 0) {
                        $scope.SelectedTempValueDetail = $scope.tempValueDetails[0];
                    }
                    GetFormDetailType();
                });
                $scope.IsInit = false;
            }
        }

        $scope.ClickFormDetailRow = function (tempValueDetail) {
            $scope.SelectedTempValueDetail = tempValueDetail;
            GetFormDetailType();
        }

        function GetFormDetailType() {
            if($scope.SelectedTempValueDetail !== null){
                FormDetailsCacheService.Get($scope.SelectedTempValueDetail.FormDetailsId).then(function (data) {
                    FormDetailsTypeCacheService.Get(data.FormDetailsTypeId).then(function (data) {
                        $scope.SelectedFormDetailsType = data;
                    });
                });
            }
        }

        $scope.Next = function () {
            var index = $scope.tempValueDetails.indexOf($scope.SelectedTempValueDetail);
            if (index + 1 < $scope.tempValueDetails.length) {
                $scope.SelectedTempValueDetail = $scope.tempValueDetails[index + 1];
            }

            GetFormDetailType();
        };

        //TODO: Add IsRequired Validation
        //TODO: Make sure form is valid
        $scope.Save = function () {
            //Save tempValue to cache
            var promises = [];
            ValueCacheService.Create($scope.tempValue).then(function (data) {
                angular.forEach($scope.tempValueDetails, function (value, key) {
                    value.ValueId = data.Id;
                    promises.push(ValueDetailsCacheService.Create(value));
                });
            });
            $q.all(promises).then(function () {
                //Fire off sync routine
                LocalDatabaseService.SynchronizeValue();
                //Save tempValueDetails to cache
                $scope.Init();
            });            
        }
    }

]);
})(moment);