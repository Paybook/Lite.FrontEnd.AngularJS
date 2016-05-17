'use strict';
app.controller('SignupCtrl', function($scope,$timeout, $q, $log,$auth, $location) {
    $scope.$parent.index.loading = false;
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
