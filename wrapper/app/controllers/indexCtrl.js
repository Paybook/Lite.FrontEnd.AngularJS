'use strict';
app.controller('IndexCtrl', function ($scope, $mdSidenav, $state, $auth, $location) {
    $scope.menuItems = [
      { name: 'accounts', path: 'accounts' },
      { name: 'transactions', path: 'transactions' },
      { name: 'settings', path: 'settings' },
    ];

    $scope.title = 'home';

    $scope.go = function (path, title) {
        $state.go(path);
        $scope.title = title;
    }

    $scope.logout = function(){
        $auth.logout()
          .then(function() {
              $location.path("/")
          });
    };//End of logout

    $scope.toggleLeft = function () {
        $mdSidenav('left')
              .toggle();
    }

    $scope.menuIcon = 'menu';
    $scope.menuToggle = function () {
        if ($scope.menuIcon == 'menu') {
            $mdSidenav('left')
              .open();
            $scope.menuIcon = 'arrow_back';
        }
        else {
            $mdSidenav('left')
              .close();
            $scope.menuIcon = 'menu';
        }
    }
});