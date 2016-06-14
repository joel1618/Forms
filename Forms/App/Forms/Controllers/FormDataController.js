(function (moment) {
    "use strict";
    angular.module('Forms').controller('FormDataController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'FormService', 'FormDetailsService', 'FormDetailsTypeService','FormDetailsOptionsService','ValueService','ValueDetailsService', 'ValueReadService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        FormService, FormDetailsService, FormDetailsTypeService, FormDetailsOptionsService, ValueService, ValueDetailService, ValueReadService) {
        var id = $routeParams.id.toLowerCase();
        var pageSize = 100;
        var page = 0;
        var item = { ValueId: "", FormId: "", Name: "", Value: "", ValueCreatedDateTime: "", ValueDetailsId : "", }
        $scope.Init = function () {
            var predicate = new breeze.Predicate('FormId', '==', id);
            ValueService.Search(predicate, page, pageSize).then(function (data) {
                debugger;
                $scope.Values = data;
            });
        }
        $scope.Init();

        }]);

})(moment);