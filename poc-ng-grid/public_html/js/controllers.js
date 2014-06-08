'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngGrid'])
        .controller('MyCtrl1', ['$scope', function($scope) {
                $scope.myData = [
                    {name: 'name1', title: 'title1', recent: true},
                    {name: 'name2', title: 'title2', recent: false},
                    {name: 'name3', title: 'title3', recent: true},
                    {name: 'name4', title: 'title4', recent: false}
                ];
                $scope.filterOptions = {
                    filterText: ''
                };
                $scope.gridOptions = {
                    data: 'myData'
                };
            }]);
