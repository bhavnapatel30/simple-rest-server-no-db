var app = angular.module('myApp', []);

app.service('itemService', function($http, $q){
	
	this.getItems = function(){
		var i = $q.defer();
		$http.get("/products").then(function(response){
			i.resolve(response);
		});
		return i.promise;		
	};
	
	this.postItem = function(new_item){
		var i = $q.defer();
		$http({
			method:'POST',
			url:'/products',
			data:new_item
		}).then(function(response){
			i.resolve(response);
		});
		return i.promise;
	};
	
	this.deleteItem = function(new_id){
		var i = $q.defer();
		$http.delete('/products/'+new_id).then(function(response){
			i.resolve(response);
		});
		return i.promise;
	}
});

app.controller('itemsCtrl', function($scope, itemService){
	$scope.newItem = {};
	$scope.showme = false;
	
	var promise = itemService.getItems();
	promise.then(function(data){
		$scope.items = data.data;
	});		
	
	$scope.display = function(){
		$scope.newItem  = {
			itemName: $scope.item_name,
			itemDescription: $scope.item_description,
			itemPrice: $scope.item_price
		};
		
		// Calling Service
		var promise = itemService.postItem($scope.newItem);
		promise.then(function(data){
			$scope.newItem = data.data;
			
			$scope.item_name="";
			$scope.item_description="";
			$scope.item_price="";
		});
		$scope.showme = true;
	};
	
	$scope.deleteData = function($event){
		$scope.ele = $event.target;
		if($scope.ele.nodeName === "SPAN"){
			$scope.itemId = $scope.ele.id;
			
			// Calling Service
			var promise = itemService.deleteItem($scope.itemId);
			promise.then(function(data){
				if(data.status === 200){
					$("#d1 div.well:has(span[id="+$scope.itemId+"])").remove();
				}
			});
		}
	};
	
});


		