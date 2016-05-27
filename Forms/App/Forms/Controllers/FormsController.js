(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormsController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionService','FormDetailsOptionDetailsService','ValueService','ValueDetailsService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionService, FormDetailsOptionDetailsService, ValueService, ValueDetailService) {
        $scope.SelectedForm = null;
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

        $scope.FormRowClick = function (form) {
            $scope.SelectedForm = form;
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
    }]);

})(moment);