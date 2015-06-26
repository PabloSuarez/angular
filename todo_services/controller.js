angular.module("ToDo",["LocalStorageModule"])
	.service('ToDoService', function(localStorageService){
		this.key = 'angular-todoList';
		this.actividades = [];
		this.actividades = localStorageService.get(this.key);

		this.add = function(nuevaActividad){
			this.actividades.push(nuevaActividad);
			this.updateLocalStorage();
		}
		this.updateLocalStorage = function(){
			localStorageService.set(this.key, this.actividades);
		}
		this.clean = function(){
			this.actividades = [];
			this.updateLocalStorage();
			return this.listAll();
		}
		this.listAll = function(){
			return this.actividades;
		}
		this.removeItem = function(item){
			this.actividades = this.actividades.filter(function(activida){
				return activida !== item;
			});
			this.updateLocalStorage();
			return this.listAll();
		}
	})

	.controller("ToDoController", function($scope, ToDoService){
		$scope.todo = ToDoService.listAll();
		$scope.nuevaActividad = {};

		$scope.agregoActividad =  function(){
			ToDoService.add($scope.nuevaActividad);
			$scope.nuevaActividad = {};
		}
		$scope.eliminarActividad =  function(item){
			$scope.todo = ToDoService.removeItem(item);
		}
		$scope.clean =  function(){
			$scope.todo = ToDoService.clean();
		}

	});

$(document).ready(function(){
	$('#datetimepicker').datetimepicker({
		dayOfWeekStart : 1,
		lang:'es',
	});
	$('#datetimepicker').datetimepicker({value: new Date(),step:10});
});

