(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormCacheService', 'FormDetailsCacheService', 'FormDetailsTypeCacheService', 'FormDetailsOptionsCacheService', 'ValueCacheService', 'ValueDetailsCacheService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormCacheService, FormDetailsCacheService, FormDetailsTypeCacheService, FormDetailsOptionsCacheService, ValueCacheService, ValueDetailCacheService) {
        var id = $routeParams.id.toLowerCase();
        var pageSize = 10;
        $scope.Init = function () {
            $scope.SelectedFormDetail = null;
            $scope.tempValue = { Id: null, FormId: id, UserId: null, Latitude: null, Longitude: null, IsSent: false, IsDeleted: false, CreatedDateTime: null, ModifiedDateTime: null, SyncDateTime: null };
            $scope.tempValueDetail = { Id: null, ValueId: null, FormDetailsId: null, Value: null, UserId: null, IsSent: false, IsDeleted: false, CreatedDateTime: null, ModifiedDateTime: null, SyncDateTime: null };
            $scope.tempValueDetails = [];
            FormCacheService.Get(id).then(function (data) {
                $scope.Form = data;
            });
            var predicate = function (row) { if (row.FormId == id) { return true; } else { return false; } }
            FormDetailsCacheService.Search(predicate, 0, pageSize, false).then(function (data) {
                $scope.FormDetails = data;
            });
        }
        $scope.Init();

        $scope.ClickFormDetailRow = function (formDetail) {
            $scope.SelectedFormDetail = formDetail;
            FormDetailsTypeCacheService.Get(formDetail.FormDetailsTypeId).then(function (data) {
                $scope.SelectedFormDetailsType = data;
            });
            $scope.tempValueDetail.FormDetailsId = formDetail.Id;
        }

        $scope.Save = function () {
            $scope.tempValueDetails.push($scope.tempValueDetail);
            if ($scope.tempValueDetails.length === $scope.FormDetails.length) {
                //Save tempValue to cache

                //Save tempValueDetails to cache
                $scope.Init();
            }
        }
    }]);
})(moment);