'use strict';

angular.module('madEase', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .state('search', {
        url: '/find-closet',
        templateUrl: '../../states/search.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .state('add', {
        url: '/add-closet',
        templateUrl: '../../states/add-closet.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .state('favorites', {
        url: '/favorites',
        templateUrl: '../../states/favorites.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    });    

    $urlRouterProvider.otherwise('/');
  })
;
