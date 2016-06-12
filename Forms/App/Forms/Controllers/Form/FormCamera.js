function FormCamera() {
}

FormCamera.prototype.SetupCamera = function ($scope) {
    var _video = null,
        patData = null;

        $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };

        // Setup a channel to receive a video property
        // with a reference to the video element
        // See the HTML binding in main.html
        $scope.channel = {};


        $scope.webcamError = {
            Value: false,
            Message: ''
        };
        $scope.onError = function (error) {
            if (error.name === 'DevicesNotFoundError') {
                $scope.$apply(function () {
                    $scope.webcamError.Value = true;
                    $scope.webcamError.Message = "No device was found.";
                });
            }
            else {
                $scope.$apply(function () {
                    $scope.webcamError.Value = true;
                    $scope.webcamError.Message = "Webcam could not be started. Did you give access to it?";
                });
            }
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
                $scope.SelectedTempValueDetail.Value = idata;
                ctxPat.putImageData(idata, 0, 0);

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
}
