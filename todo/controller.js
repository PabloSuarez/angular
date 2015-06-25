angular.module("ToDo",["LocalStorageModule"])
	.factory('ToDoService', function(localStorageService){
		var toDoService = {};
		toDoService.key = 'angular-todoList';
		toDoService.actividades = [];
		toDoService.actividades = localStorageService.get(toDoService.key);

		toDoService.add = function(nuevaActividad){
			toDoService.actividades.push(nuevaActividad);
			toDoService.updateLocalStorage();
		}
		toDoService.updateLocalStorage = function(){
			localStorageService.set(toDoService.key, toDoService.actividades);
		}
		toDoService.clean = function(){
			toDoService.actividades = [];
			toDoService.updateLocalStorage();
			return toDoService.listAll();
		}
		toDoService.listAll = function(){
			return toDoService.actividades;
		}
		toDoService.removeItem = function(item){
			toDoService.actividades = toDoService.actividades.filter(function(activida){
				return activida !== item;
			});
			toDoService.updateLocalStorage();
			return toDoService.listAll();
		}
		return toDoService;
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

