var app = angular.module('Forms', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'breeze.angular', 'Services']);

////https://github.com/grevory/angular-local-storage
//app.config(function (localStorageServiceProvider) {
//    localStorageServiceProvider
//      .setPrefix('DynamicForms')
//      .setNotify(true, true)
//});

//http://stackoverflow.com/questions/19276095/execute-code-at-startup-of-angular-application
app.run(['LocalDatabaseService', function(LocalDatabaseService){
    //Call local storage database create
    LocalDatabaseService.CreateDatabase();
}]);

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
}]);