(function (moment) {
    "use strict";
    angular.module('Forms').controller('ValuePopupController', ['$scope', '$timeout','$uibModalInstance', 'ValueDetail',
    function controller($scope, $timeout, $uibModalInstance, ValueDetail) {

        $scope.$watch('$viewContentLoaded', function () {
            $timeout(function () {
                var canvas = document.getElementById("snapshot");
                var ctx = canvas.getContext("2d");

                var image = new Image();
                image.onload = function () {
                    debugger;
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                };
                image.src = ValueDetail.ValuePicture;
            }, 0);
        });

        //$scope.ok = function () {
        //    $uibModalInstance.close($scope.selected.item);
        //};

        $scope.Close = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
})(moment);