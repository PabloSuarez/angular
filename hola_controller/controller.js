var app = angular.module("MyFirstApp",[]);

app.controller("FirstController", function ($scope) {
	$scope.nombre = "Pablo Suarez";
	$scope.nuevoComentario = {};
	$scope.comentarios = [
		{
			comentario: "Buen tutorial",
			username: "Codigo Facilito"
		},
		{
			comentario: "Malísimo video",
			username: "BtmanUSer"
		},
	];

	$scope.agregarComentario = function(){
		$scope.comentarios.push($scope.nuevoComentario);
		$scope.nuevoComentario = {};
	}
});
