'use strict';
app.controller('SignupCtrl', function($timeout, $q, $log,$auth, $location) {
    var vm = this;
    vm.signup = function() {
    	console.log("signup");
        $auth.signup({
            username: vm.userEmail,
            password: vm.userPassword
        })
        .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/login");
        })
        .catch(function(response) {
            // Si ha habido errores, llegaremos a esta función
        });
    }//End of signup
});
