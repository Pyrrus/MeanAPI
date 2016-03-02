var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/attacklist').success(function(response) {
    console.log("I got the data I requested");
    $scope.attacklist = response;
    $scope.attack = "";
  });
};

refresh();

$scope.addattack = function() {
  console.log($scope.attack);
  $http.post('/attacklist', $scope.attack).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/attacklist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/attacklist/' + id).success(function(response) {
    $scope.attack = response;
  });
};

$scope.roll = function(id) {
  console.log(id);
  $http.get('/attacklist/' + id).success(function(response) {
    console.log("in")
    console.log($scope.dice.roll(response.damage));



  });
};


$scope.makeDie = function(sides) {
  var die = function () {
    return 1 + Math.random() * sides | 0;
  };

  die.times = function (count) {
    var rolls = [];
    for(var i = 0 ; i < count ; i++) {
      rolls.push(this());
    }
    return rolls;
  };

  return die;
};

$scope.dice = {
  d4: $scope.makeDie(4),
  d6: $scope.makeDie(6),
  d8: $scope.makeDie(8),
  d10: $scope.makeDie(10),
  d12: $scope.makeDie(12),
  d20: $scope.makeDie(20),
  roll: function (expression) {
    var self = this, rolls = [];

    expression.toLowerCase().replace(/(\d+)(d\d+)?/g, function (_, count, die) {
      if(die) {
        console.log(die)
        rolls = rolls.concat(self[die].times(+count));
      } else {
        rolls.push(+count);
      }
    });

    return rolls.reduce(function (sum, roll) {
      return sum + roll;
    });
  }
};

$scope.update = function() {
  console.log($scope.attack._id);
  $http.put('/attacklist/' + $scope.attack._id, $scope.attack).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.attack = "";
}

}]);﻿

