﻿(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormController', ['$scope', '$rootScope', '$routeParams', '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze',
         'LocalDatabaseService', 'FormCacheService', 'FormDetailsCacheService', 'FormDetailsTypeCacheService', 'FormDetailsOptionsCacheService', 'ValueCacheService', 'ValueDetailsCacheService',
    function controller($scope, $rootScope, $routeParams, $http, $q, $location, $timeout, breezeservice, breeze,
        LocalDatabaseService, FormCacheService, FormDetailsCacheService, FormDetailsTypeCacheService, FormDetailsOptionsCacheService, ValueCacheService, ValueDetailsCacheService) {
        $scope.IsSyncing = true;
        $scope.alerts = [];
        LocalDatabaseService.Synchronize();
        $scope.IsInit = false;
        $scope.IsSaving = false;
        var id = $routeParams.id.toLowerCase();
        var pageSize = 10;
        $rootScope.$on('IsSyncing', function (event, args) {
            $scope.IsSyncing = args.IsSyncing;
            if (!args.IsSyncing) {
                $scope.Init();
            }
        });
        $scope.Init = function () {
            if (!$scope.IsInit) {
                $scope.IsInit = true;
                $scope.clearImage();
                $scope.SelectedTempValueDetail = null; $scope.SelectedFormDetailsType = null;
                $scope.tempValue = { Id: null, FormId: id, UserId: null, Latitude: null, Longitude: null, IsSent: false, IsDeleted: false, CreatedDateTime: null, ModifiedDateTime: null, SyncDateTime: null };
                $scope.tempValueDetail = {
                    Id: null, ValueId: null, FormDetailsId: null, Value: null, ValueDate: null, ValuePassword: null, ValuePicture: null,
                    Name: null, UserId: null, IsSent: false, IsDeleted: false, IsRequired: false, CreatedDateTime: null, ModifiedDateTime: null, SyncDateTime: null
                };
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
            if ($scope.SelectedFormDetailsType.Name === 'Date') {
                tempValueDetail.Value = tempValueDetail.ValueDate;
            }
            $scope.SelectedTempValueDetail = tempValueDetail;
            GetFormDetailType();
        }

        function GetFormDetailType() {
            if ($scope.SelectedTempValueDetail !== null) {
                FormDetailsCacheService.Get($scope.SelectedTempValueDetail.FormDetailsId).then(function (data) {
                    FormDetailsTypeCacheService.Get(data.FormDetailsTypeId).then(function (data) {                       
                        $scope.SelectedFormDetailsType = data;
                        GetFormDetailOptions();
                    });
                });
            }
        }

        function GetFormDetailOptions() {
            if ($scope.SelectedTempValueDetail != null) {
                if ($scope.SelectedFormDetailsType.Name === 'Drop Down') {
                    var predicate = function (row) { if (row.FormDetailsId == $scope.SelectedTempValueDetail.FormDetailsId) { return true; } else { return false; } }
                    FormDetailsOptionsCacheService.Search(predicate, 0, 100, false).then(function (data) {
                        data.splice(0, 0, { FormDetailsId: '', SyncDateTime: '', Id: '', Name: '' });
                        $scope.SelectedFormDetailsOptions = data;
                    });
                }
            }
        }

        $scope.Next = function () {
            $scope.removeImageFromScreen();
            if ($scope.SelectedFormDetailsType.Name === 'Date') {
                $scope.SelectedTempValueDetail.Value = $scope.SelectedTempValueDetail.ValueDate;
            }
            var index = $scope.tempValueDetails.indexOf($scope.SelectedTempValueDetail);
            if (index + 1 < $scope.tempValueDetails.length) {
                $scope.SelectedTempValueDetail = $scope.tempValueDetails[index + 1];
            }
            GetFormDetailType();
        };

        $scope.Back = function () {
            $scope.removeImageFromScreen();
            if ($scope.SelectedFormDetailsType.Name === 'Date') {
                $scope.SelectedTempValueDetail.Value = $scope.SelectedTempValueDetail.ValueDate;
            }
            var index = $scope.tempValueDetails.indexOf($scope.SelectedTempValueDetail);
            if (index !== 0) {
                $scope.SelectedTempValueDetail = $scope.tempValueDetails[index - 1];
            }

            GetFormDetailType();
        };

        //https://jsfiddle.net/awolf2904/qww6g0a6/
        //VIDEO
        var camera = new FormCamera();
        camera.SetupCamera($scope);


        //TODO: Add IsRequired Validation
        //TODO: Make sure form is valid
        $scope.Save = function () {
            $scope.IsSaving = true;
            if ($scope.Validate()) {
                if ($scope.SelectedFormDetailsType.Name === 'Date') {
                    $scope.SelectedTempValueDetail.Value = $scope.SelectedTempValueDetail.ValueDate;
                }
                //Save tempValue to cache
                var promises = [];
                $scope.tempValue.Latitude = '';
                $scope.tempValue.Longitude = '';
                ValueCacheService.Create($scope.tempValue).then(function (data) {
                    angular.forEach($scope.tempValueDetails, function (value, key) {
                        value.ValueId = data.Id;
                        promises.push(ValueDetailsCacheService.Create(value));
                    });
                });
                $q.all(promises).then(function () {
                    //Fire off sync routine
                    LocalDatabaseService.SynchronizeValue();
                    if (navigator.onLine) {
                        $scope.alerts.push({ type: 'success', msg: 'Data has been saved to the server!' });
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'Data has been saved locally and will be pushed to the server when a connection is available.' });
                    }
                    $timeout(function () {
                        $scope.DeleteAlert(0, 1);
                    }, 5000);
                    //Save tempValueDetails to cache
                    $scope.Init();
                });
            }
            $scope.IsSaving = false;
        }

        $scope.DeleteAlert = function (index) {
            $scope.alerts.splice(index, 1);
        }

        $scope.Clear = function () {
            $scope.SelectedTempValueDetail.Value = null; $scope.SelectedTempValueDetail.ValueDate = null; $scope.SelectedTempValueDetail.ValuePassword = null; $scope.SelectedTempValueDetail.ValuePicture = null;
            $scope.clearImage();
        }

        $scope.Validate = function () {
            var IsValid = true;
            angular.forEach($scope.tempValueDetails, function (value, key) {
                if ((value.Value === null || value.Value === '') && value.ValuePicture === null && value.IsRequired === true) {
                    alert('A required field is missing a value.');
                    IsValid = false;
                }
            });
            return IsValid;
        }
    }

    ]);
})(moment);