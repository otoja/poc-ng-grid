'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngGrid'])
        .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
                $http.get('data/data.json').success(function(allData) {
                    $scope.myData = allData;
                });
                $scope.filterOptions = {
                    filterText: '',
                    useExternalFilter: true
                };
                $scope.gridOptions = {
                    data: 'myData',
                    highlighting: true,
                    showSelectionCheckbox: true,
                    multiSelect: true,
                    selectWithCheckboxOnly: true,
                    primaryKey: 'guid',
                    filterOptions: $scope.filterOptions
//                    plugins: [new ngGridFlexibleHeightPlugin()]
                };
            }]);
