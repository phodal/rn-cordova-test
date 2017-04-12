var app = angular.module('moTree', []);
app.controller('HomeCtrl', function ($scope) {
  $scope.loadDataFinish = false;
  init();

  function init() {
    $scope.skillInfo = [];
    $scope.loadDataFinish = true;
  }

  $scope.$on('$ionicView.beforeEnter', function () {
    init();
  });

  $scope.openSkill = function (event) {
    var id = event.srcElement.parentElement.getAttribute('id');
    window.postMessage(JSON.stringify({ id: id}));
  };

  $scope.canAddPoint = function () {

  };

  $scope.hasPoint = function (skill_id) {

  };
})
