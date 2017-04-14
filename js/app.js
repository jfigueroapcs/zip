// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'main.controllers', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $http, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
         template: '<ion-spinner icon="spiral" class="spinner-calm"/>'
        })
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    });

})

// App Service Show alert, Ionic Loading etc
.service('appService', ['$ionicPopup', '$ionicLoading', '$timeout', function($ionicPopup, $ionicLoading, $timeout) {

    this.url = "http://example.com"; // Change url as your website url http://your-web-url.com
    
    // An alert dialog
    this.showAlert = function(status, message, time) {

        time = typeof time !== 'undefined' ? time : 2000;
        status = angular.uppercase(status);

        var alertPopup = $ionicPopup.alert({
            title: status,
            template: message
        });
        
        $timeout(function() {
            alertPopup.close(); //close the popup after 3 seconds
        }, time);

    };

    //Toast meassage
    this.toast = function(message) {
        $ionicLoading.show({
            template: message,
            noBackdrop: true,
            duration: 800
        });
    };

    return this;
}])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {


    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                //$rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    })

  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

    .state('app.posts', {
      cache: false,
      url: '/posts',
      views: {
        'menuContent': {
          templateUrl: 'templates/categorypost.html',
          controller: 'CategorypostCtrl'
        }
      }
    })

  .state('app.form', {
      url: '/form',
      views: {
        'menuContent': {
          templateUrl: 'templates/form.html',
          controller: 'FormCtrl'
        }
      }
    })

  .state('app.post', {
    url: '/posts/post',
    views: {
      'menuContent': {
        templateUrl: 'templates/post.html',
        controller: 'PostCtrl'
      }
    }
  })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
