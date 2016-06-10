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
                $scope.tempValueDetail = { Id: null, ReferenceId: null, ValueId: null, FormDetailsId: null, Value: null, DateValue: null, Passwordvalue: null, Name: null, UserId: null, IsSent: false, IsDeleted: false, IsRequired: false, CreatedDateTime: null, ModifiedDateTime: null, SyncDateTime: null };
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
                tempValueDetail.Value = tempValueDetail.DateValue;
            }
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
            if ($scope.SelectedFormDetailsType.Name === 'Date') {
                $scope.SelectedTempValueDetail.Value = $scope.SelectedTempValueDetail.DateValue;
            }
            var index = $scope.tempValueDetails.indexOf($scope.SelectedTempValueDetail);
            if (index + 1 < $scope.tempValueDetails.length) {
                $scope.SelectedTempValueDetail = $scope.tempValueDetails[index + 1];
            }

            GetFormDetailType();
        };

        //https://jsfiddle.net/awolf2904/qww6g0a6/
        //VIDEO
        var _video = null,
        patData = null;

        $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };

        // Setup a channel to receive a video property
        // with a reference to the video element
        // See the HTML binding in main.html
        $scope.channel = {};

        $scope.webcamError = false;
        $scope.onError = function (err) {
            $scope.$apply(
                function () {
                    $scope.webcamError = err;
                }
            );
        };

        $scope.onSuccess = function () {
            // The video element contains the captured camera data
            _video = $scope.channel.video;
            $scope.$apply(function () {
                $scope.patOpts.w = _video.width;
                $scope.patOpts.h = _video.height;
                //$scope.showDemos = true;
            });
        };

        $scope.onStream = function (stream) {
            // You could do something manually with the stream.
        };

        $scope.makeSnapshot = function () {
            if (_video) {
                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) return;

                patCanvas.width = _video.width;
                patCanvas.height = _video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                sendSnapshotToServer(patCanvas.toDataURL());

                patData = idata;
            }
        };

        /**
         * Redirect the browser to the URL given.
         * Used to download the image by passing a dataURL string
         */
        $scope.downloadSnapshot = function downloadSnapshot(dataURL) {
            window.location.href = dataURL;
        };

        var getVideoData = function getVideoData(x, y, w, h) {
            var hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = _video.width;
            hiddenCanvas.height = _video.height;
            var ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(_video, 0, 0, _video.width, _video.height);
            return ctx.getImageData(x, y, w, h);
        };

        /**
         * This function could be used to send the image data
         * to a backend server that expects base64 encoded images.
         *
         * In this example, we simply store it in the scope for display.
         */
        var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
            $scope.snapshotData = imgBase64;
        };



        //TODO: Add IsRequired Validation
        //TODO: Make sure form is valid
        $scope.Save = function () {
        if ($scope.SelectedFormDetailsType.Name === 'Date') {
                $scope.SelectedTempValueDetail.Value = $scope.SelectedTempValueDetail.DateValue;
            }
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