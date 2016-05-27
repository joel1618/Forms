var controlpanel = angular.module('Forms', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'breeze.angular', 'Services']);

controlpanel.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../App/Forms/Views/Forms.html'
        })
        //.when('/controlpanel/:id', {
        //    templateUrl: '../App/Merchandise/views/controlpanel.html'
        //})
        .otherwise({
            redirectTo: '/'
        });
}])