angular.module("contactModule", [
	"ngRoute",
	"coreModule"
])
.config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider
        .when('/contact', {
            title: "Contact Us",
            templateUrl: "/views/contact/contact.html",
            controller: "contactController"
        });
    }
])
.service('emailService', [
	'$http',
    'REST_SERVER_URI',
	function($http, REST_SERVER_URI) {
		var url = REST_SERVER_URI + '/app/email';

		this.post = function(data) {
			return $http.post(url, data)
			.then(function(response){
				return response.data;
			});
		}
	}
])
.controller('contactController', [
	'$scope',
	'emailService',
	function($scope, emailService){

		$scope.contactFormSuccessMessage = false;

		$scope.submit = function() {
			$scope.contactFormSuccessMessage = true;
			$scope.contactFormErrorMessage = false;

			var data = {
				formLocation: 'contact',
				name: $scope.contactForm.name,
				tel: $scope.contactForm.tel,
				email: $scope.contactForm.email,
				comment: $scope.contactForm.comment,
			};

			emailService.post(data)
			.then(function(response){
				if (response.result == 'ok') {
					$scope.contactFormSuccessMessage = true;
				} else {
					$scope.contactFormErrorMessage = true;
				}
			})
		}
	}
]);
