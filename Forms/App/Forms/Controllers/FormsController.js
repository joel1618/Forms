(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormsController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionService','FormDetailsOptionDetailsService','ValueService','ValueDetailsService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionService, FormDetailsOptionDetailsService, ValueService, ValueDetailService) {
        $scope.SelectedFormRow = null;
        $scope.SelectedFormDetailType = null;
        $scope.ClearTemp = function () {
            $scope.TempForm = { Id: '', Name: '', Description: '', PublishUrl: '' };
            $scope.TempFormItem = { Id: '', FormId: '', Name: '', Description: '', Title: '', FormDetailsTypeId: '', FormDetailsOptionId: '', IsRequired: ''};
        }
        $scope.ClearTemp();

        $scope.Search = function () {
            FormService.Search(null, 0, 20, false).then(function (data) {
                $scope.Forms = data;
            });
        }
        $scope.Search();

        $scope.LoadFormDetailTypes = function () {
            FormDetailsTypeService.Search(null, 0, 20, false).then(function (data) {
                $scope.FormDetailTypes = data;
            });
        }
        $scope.LoadFormDetailTypes();

        $scope.FormRowClick = function (form) {
            $scope.SelectedFormRow = form;
            $scope.SearchFormDetails(form.Id);
        }
        $scope.FormDelete = function (id) {
            //Alert User
            //Delete Form
        }
        $scope.FormCreate = function () {
            FormService.Create($scope.TempForm).then(function (data) {
                $scope.Search();
                $scope.ClearTemp();
            });
        }

        $scope.SearchFormDetails = function (id) {
            var predicate = new breeze.Predicate('FormId', '==', id);
            FormDetailsService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.FormDetails = data;
            });
        }

        $scope.FormDetailCreate = function () {
            $scope.TempFormItem.FormDetailsTypeId = $scope.SelectedFormDetailType.Id;
            $scope.TempFormItem.FormId = $scope.SelectedFormRow.Id;
            FormDetailsService.Create($scope.TempFormItem).then(function (data) {
                $scope.SearchFormDetails($scope.SelectedFormRow.Id);
            })
        }
    }]);

})(moment);