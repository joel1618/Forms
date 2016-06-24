(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormDataController', ['$scope', '$uibModal', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'ValueReadService',
    function controller($scope, $uibModal, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailsService, ValueReadService) {
            var id = $routeParams.id.toLowerCase();
            var pageSize = 1000;
            var page = 0;
            $scope.Search = function () {
                var predicate = new breeze.Predicate('FormId', '==', id);
                ValueReadService.Search(predicate, id, page, pageSize, false).then(function (data) {
                    $scope.Items = data;
                });
            }
            $scope.Search();

            $scope.DeleteValue = function (item) {
                ValueService.Delete(item.Id).then(function (data) {
                    $scope.Search();
                });
            }

            $scope.RowClick = function (item) {
                $scope.SelectedItem = item;
            }

            $scope.EditValue = function (item) {
                //Value Id, Column Name?
            }

            $scope.MouseOverPicture = function (Id) {
                ValueDetailsService.Get(Id).then(function (data) {
                    //popup with data.ValuePicture as the image or file
                    var modalInstance = $uibModal.open({
                        templateUrl: 'App/Forms/Views/FormData/ValuePopup.html',
                        controller: 'ValuePopupController',
                        resolve: {
                            ValueDetail: function () {
                                return data;
                            }
                        }
                    });

                    /*modalInstance.result.then(function (selectedItem) {
                      $scope.selected = selectedItem;
                    }, function () {
                      $log.info('Modal dismissed at: ' + new Date());
                    });*/
                });                
            }

            $scope.IsGuid = function (item) {
                var regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;
                var match = regex.exec(item);
                return match != null;
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