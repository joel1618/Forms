﻿(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormDataController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'ValueReadService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailService, ValueReadService) {
            var id = $routeParams.id.toLowerCase();
            var pageSize = 100;
            var page = 0;

            $scope.Search = function () {
                var predicate = new breeze.Predicate('FormId', '==', id);
                ValueReadService.Search(predicate, id, page, pageSize, false).then(function (data) {
                    debugger;
                    $scope.Values = data;
                });
            }
            $scope.Search();

            $scope.DeleteValue = function (Value) {
                ValueService.Delete(Value.Id).then(function (data) {
                    $scope.Search();
                });
            }

            $scope.ExportExcel = function () {
                var blob = new Blob([document.getElementById('data').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "Report.xls");
            };

            $scope.ExportPdf = function () {

            }
        }]);
})(moment);