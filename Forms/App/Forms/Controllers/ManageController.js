(function (moment) {
    "use strict";
    angular.module('Forms').controller('ManageController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailService) {
        var pageSize = 10;
        $scope.SelectedForm = null; $scope.SelectedFormDetail = null; $scope.SelectedFormDetailOption = null;
        $scope.SelectedFormDetailType = null;
        $scope.ClearTemp = function () {
            $scope.TempForm = { Id: '', Name: '', Description: '', PublishUrl: '' };
            $scope.TempFormItem = { Id: '', FormId: '', Name: '', Description: '', Title: '', FormDetailsTypeId: '', IsRequired: '' };
            $scope.TempFormDetailOption = { Id: '', FormDetailsId: '', Name: '' };
        }
        $scope.ClearTemp();

        $scope.Search = function () {
            FormService.Search(null, 0, pageSize, false).then(function (data) {
                $scope.Forms = data;
            });
        }
        $scope.Search();

        $scope.LoadFormDetailTypes = function () {
            FormDetailsTypeService.Search(null, 0, pageSize, false).then(function (data) {
                $scope.FormDetailTypes = data;
            });
        }
        $scope.LoadFormDetailTypes();

        $scope.FormRowClick = function (form) {
            $scope.SelectedForm = form;
            $scope.SelectedFormDetail = null; $scope.SelectedFormDetailOption = null;
            $scope.FormDetails = null; $scope.FormDetailsOptions = null;
            $scope.SearchFormDetails(form.Id);
        }
        $scope.DeleteForm = function (item) {
            //TODO: Alert User
            //Delete Form
            FormService.Delete(item.Id).then(function (data) {
                $scope.Forms = null; $scope.FormDetails = null; $scope.FormDetailsOptions = null;
                $scope.SelectedForm = null; $scope.SelectedFormDetail = null; $scope.SelectedFormDetailOption = null;
            });
        }
        $scope.CreateForm = function () {
            FormService.Create($scope.TempForm).then(function (data) {
                $scope.Search();
                $scope.ClearTemp();
            });
        }

        $scope.SearchFormDetails = function (id) {
            var predicate = new breeze.Predicate('FormId', '==', id);
            FormDetailsService.Search(predicate, 0, pageSize, false).then(function (data) {
                $scope.FormDetails = data;
            });
        }

        $scope.CreateFormDetail = function () {
            $scope.TempFormItem.FormDetailsTypeId = $scope.SelectedFormDetailType.Id;
            $scope.TempFormItem.FormId = $scope.SelectedForm.Id;
            FormDetailsService.Create($scope.TempFormItem).then(function (data) {
                $scope.SearchFormDetails($scope.SelectedForm.Id);
                $scope.ClearTemp();
            })
        }

        $scope.DeleteFormDetail = function (item) {
            FormDetailsService.Delete(item.Id).then(function (data) {
                $scope.FormDetailsOptions = null;
                $scope.SelectedFormDetail = null; $scope.SelectedFormDetailOption = null;
                $scope.SearchFormDetails($scope.SelectedForm.Id);
            });
        };

        $scope.FormItemRowClick = function (item) {
            debugger;
            $scope.SelectedFormDetail = item;
            $scope.SearchFormDetailOptions(item.Id);
        };

        $scope.SearchFormDetailOptions = function (id) {
            var predicate = new breeze.Predicate('FormDetailsId', '==', id);
            FormDetailsOptionsService.Search(predicate, 0, pageSize, false).then(function (data) {
                $scope.FormDetailsOptions = data;
            });
        };

        $scope.DeleteFormDetailOption = function (item) {
            FormDetailsOptionsService.Delete(item.Id).then(function (data) {
                $scope.SearchFormDetailOptions($scope.SelectedFormDetail.Id);
            });
        }

        $scope.CreateFormDetailOption = function () {
            $scope.TempFormDetailOption.FormDetailsId = $scope.SelectedFormDetail.Id;
            FormDetailsOptionsService.Create($scope.TempFormDetailOption).then(function (data) {
                $scope.SearchFormDetailOptions($scope.SelectedFormDetail.Id);
                $scope.ClearTemp();
            });
        };

    }]);

})(moment);