var app = angular.module('Forms', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'breeze.angular', 'Services', 'LocalStorageModule']);

//https://github.com/grevory/angular-local-storage
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('DynamicForms')
      .setNotify(true, true)
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../App/Forms/Views/Manage.html'
        })
        .when('/:id', {
            templateUrl: '../App/Forms/Views/Form.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}])