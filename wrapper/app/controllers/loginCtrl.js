'use strict';
app.controller('LoginCtrl', function($timeout, $q, $log,$auth, $location, $mdToast) {
    var vm = this;
    vm.loginMessage = '';
    vm.login = function(){
        $auth.login({
            username: vm.userEmail,
            password: vm.userPassword
        })
        .then(function(){
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            $location.path("/sites")
        })
        .catch(function(response){
            // Si ha habido errores llegamos a esta parte
            // vm.loginMessage = response.data;
            $mdToast.show(
                $mdToast.simple()
                    .textContent(response.data)
                    .position('bottom')
                    .hideDelay(3000)
            );
        });
    }//End of login
});