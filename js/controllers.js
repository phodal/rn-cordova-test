angular.module('moTree', [])
.controller('HomeCtrl', function ($scope, $state) {
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
    console.log(id);
  };

  $scope.canAddPoint = function () {

  };

  $scope.hasPoint = function (skill_id) {

  };
})
