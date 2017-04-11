angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $rootScope) {
  $scope.$on('$ionicView.afterEnter', function() {
    if (!$rootScope.alreadyEnter) {
      if (!window.cordova) {
        $rootScope.alreadyEnter = true;
        $ionicModal.fromTemplateUrl('templates/svg-splash.html', {
          scope: $scope,
          animation: 'scale-in'
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
          var splashAnimate = new Vivus('splash', {type: 'sync', duration: 150});
          $scope.splashAnimate = function () {
            return splashAnimate;
          };
        });

        $timeout(function () {
          $scope.modal.hide();
        }, 3000);
      }
    }
  });
})

.controller('HomeCtrl', function ($scope, $state) {
  $scope.loadDataFinish = false;
  init();

  function init() {
    localforage.getItem('skill', function (err, value) {
      $scope.loadDataFinish = true;

      if (value) {
        $scope.loadDataFinish = true;
        $scope.skillInfo = value;
      } else {
        $scope.skillInfo = [];
      }
      $scope.$apply();
    });
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
    if ($scope.skillInfo[skill_id] !== undefined) {
      return $scope.skillInfo[skill_id];
    }
    return false;
  };
})

.controller('SkillCtrl', function ($scope, $state, $stateParams) {
  var id = $stateParams.id;

  init();

  function init () {
    $scope.skill = _.filter(window.SKILL_TREE, {"id": parseInt(id)})[0];
    $scope.skillDependenceId = $scope.skill.depends;

    $scope.skillDependence = [];
    _.forEach($scope.skillDependenceId, function (dependenceId) {
      var dependence = _.filter(window.SKILL_TREE, {"id": dependenceId})[0];
      $scope.skillDependence.push(dependence);
    });

    localforage.getItem('skill', function (err, value) {
      if (value) {
        $scope.skillInfo = value;
      } else {
        $scope.skillInfo = [];
      }
    });

    localforage.getItem('skill.' + $scope.skill.id, function (err, value) {
      if (value) {
        $scope.skillStorageInfo = value;
      } else {
        $scope.skillStorageInfo = {};
      }
    });
  }

  $scope.gotoDependence = function (id) {
    $state.go('app.skill', {id: id});
  };

  $scope.addItemToDone = function () {
    localforage.setItem('skill.' + $scope.skill.id, $scope.skillStorageInfo);
    var alreadyFinishItems = 0;
    _.forEach($scope.skillStorageInfo, function (skill) {
      if (skill.checked) {
        alreadyFinishItems++;
      }

      if (alreadyFinishItems === $scope.skill.rankDescriptions.length) {
        $scope.skillInfo[id] = true;
        localforage.setItem('skill', $scope.skillInfo);
      } else {
        $scope.skillInfo[id] = false;
        localforage.setItem('skill', $scope.skillInfo);
      }
    });
  };

  $scope.isIOS = function () {
    return ionic.Platform.isIOS();
  };

  $scope.openLink = function (link) {
    if (window.cordova && window.cordova.InAppBrowser) {
      window.open = cordova.InAppBrowser.open;
    }

    if (link.url) {
      window.open(link.url, '_system', 'location=yes');
      return false;
    }
  }
});
