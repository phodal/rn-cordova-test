angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $rootScope) {

})

.controller('HomeCtrl', function ($scope, $state) {
  $scope.loadDataFinish = false;
  init();

  function init() {
    $scope.skillInfo = [];
    $scope.loadDataFinish = true;
  }

  $scope.$on('$ionicView.beforeEnter', function() {
    init();
  });

  $scope.openSkill = function (event) {
    var id = event.srcElement.parentElement.getAttribute('id');
    $state.go('app.skill', {id: id});
  };

  $scope.canAddPoint = function () {

  };

  $scope.hasPoint = function (skill_id) {

  };
})

.controller('SkillCtrl', function ($scope, $state, $stateParams) {

});
