var app = angular.module('myApp', []);
		
app.controller('itemsCtrl', function($scope, $http){
	$http.get("/products").success(function(response){
		$scope.items = response;
	});
});
		
app.controller('postItemCtrl', function($scope,$http){
	$scope.newItem = {};
	$scope.showme = false;
			
	$scope.display = function(){
		$scope.newItem  = {
			itemName: $scope.item_name,
			itemDescription: $scope.item_description,
			itemPrice: $scope.item_price
		};

		$http({
			method:'POST',
			url:'/products',
			data:$scope.newItem
		}).success(function(response){
			$scope.newItem = response;

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
			$http.delete('/products/'+$scope.itemId).success(function(response,status){
				if(status === 200){
					$("#d1 div.well:has(span[id="+$scope.itemId+"])").remove();
				}
			});
		}
	};
			
});
		