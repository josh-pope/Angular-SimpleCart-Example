// basic shopping cart coding test for comscore
// @auth Josh Pope

var comscoreShoppingCart = angular.module('comscoreShoppingCart', []);

comscoreShoppingCart.controller('CartController', ['$scope', function($scope) {
  $scope.cartItems = [
    // to start, the cart is empty
  ];
  
  // base inventory - use addToInventory to add to this
  $scope.inventory = [
        {'product': 'popcorn',  'price': 3.00},
        {'product': 'snickers', 'price': 4.00},
        {'product': 'soda',  'price': 2.00}
  ];

  // special pricing object
  // special prices are triggered by quantity
  $scope.specialPrices = [
        {'product': 'snickers', 'quantity': 5, 'specialPrice': 12.00} // for snickers- if you purchase quantity 5, adjust the price 
  ];



  // since we can add to the cart, and the cart is a data object- why not add a simple method to remove items?
  $scope.remove = function(index) {
    $scope.cartItems.splice(index, 1);
  }


  // add an item to the inventory
  $scope.addToInventory = function() {
    if(!$scope.newproduct || !$scope.newprice) return;
    var _newInventoryItem = {
          'product': $scope.newproduct, 
          'price': $scope.newprice 
        };
        if(isNaN($scope.newprice)) return;
        $scope.inventory.push(_newInventoryItem);
}


  // 
  $scope.addToCart = function() {
    var _item = $scope.item;
    var _price;
    var _quantity = $scope.quantity;

    if(!$scope.item) return; // halt if no item

    // first, grab the correct price for this item from the prices object
    for(var i = 0; i<$scope.inventory.length; i++) {
      if($scope.item === $scope.inventory[i].product) {
        _price = $scope.inventory[i].price;
      }
    }
    _price = _price * _quantity;

    if(isNaN(_price)) return; // super simple error checking. in an app, this would be extrapolated and much more significant

    // check if the item needs any special pricing.
    for(var i = 0; i<$scope.specialPrices.length; i++) {
      // check if the item is in the specialPrices object
      // also check if the quantity equals the quantity defined in specialPrices
      if($scope.item === $scope.specialPrices[i].product && $scope.specialPrices[i].quantity === Number($scope.quantity)) {
        _price = $scope.specialPrices[i].specialPrice;
      }
    }

    var _newCartItem = {
      'name': $scope.item, 
      'quantity': $scope.quantity, 
      'price': _price 
    };
    
    $scope.cartItems.push(_newCartItem);
  }



}]);