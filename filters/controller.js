angular.module("mainModule", [])
	.filter("", function(){
		return function(texto){
			return String(texto).replace('/<[^>]+>/gm','');
		}
	})