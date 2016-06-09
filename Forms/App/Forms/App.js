var app = angular.module('Forms', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'breeze.angular', 'frapontillo.bootstrap-switch', 'Services']);

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

//http://plnkr.co/edit/Q3LkiI7Cj4RWBNRLEJUA?p=preview
app.run(function($window, $rootScope) {
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          //$rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
          $rootScope.$apply(function () {
          //Try to sync when we come online
          //LocalDatabaseService.CreateDatabase();
        });
      }, false);
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
}]);