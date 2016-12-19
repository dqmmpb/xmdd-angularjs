'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers', 'starter.services','ui.router', 'ngMessages'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    // setup an abstract state for the tabs directive
    .state('step', {
      url: '/step',
      abstract: true,
      templateUrl: 'templates/header.html'
    })
    .state('step.index', {
      url: '/index',
      templateUrl: 'templates/index.html'
    })
    .state('step.base', {
      url: '/base',
      templateUrl: 'templates/base.html',
      controller: 'BaseCtrl'
    })
    .state('step.company', {
      url: '/company',
      templateUrl: 'templates/company.html',
      controller: 'CompanyCtrl'
    })
    .state('step.network', {
      url: '/network',
      templateUrl: 'templates/network.html',
      controller: 'NetworkCtrl'
    })
    .state('step.result', {
      url: '/result',
      templateUrl: 'templates/result.html'
    })
    .state('step.xykzc', {
      url: '/xykzc',
      templateUrl: 'templates/xykzc.html'
    })
    .state('step.lyhy', {
      url: '/lyhy',
      templateUrl: 'templates/lyhy.html'
    })
    .state('step.submit', {
      url: '/submit',
      controller: 'SubmitCtrl'
    })
    .state('step.finally', {
      url: '/finally',
      templateUrl: 'templates/finally.html'
    });

  $urlRouterProvider.otherwise('/step/index');
}).run(function() {
  FastClick.attach(document.body);
});

