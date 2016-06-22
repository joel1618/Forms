(function (moment) {
    "use strict";
    angular.module('Forms').controller('ValuePopupController', ['$scope', '$uibModalInstance', 'ValueDetail',
    function controller($scope, $uibModalInstance, ValueDetail) {
            debugger;
            var patCanvas = document.querySelector('#snapshot');

            patCanvas.width = 800;
            patCanvas.height = 600;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);
            sendSnapshotToServer(patCanvas.toDataURL());

            patData = idata;

            //$scope.ok = function () {
            //    $uibModalInstance.close($scope.selected.item);
            //};

            $scope.Close = function(){
                $uibModalInstance.dismiss('cancel');
            }
    }]);
})(moment);