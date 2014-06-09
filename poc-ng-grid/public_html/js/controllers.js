'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngGrid'])
        .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
                //configure grid
                $scope.filterOptions = {
                    filterText: ''
                };

                $scope.pagingOptions = {
                    currentPage: 1,
                    pageSizes: [10, 20, 50, 100, 200],
                    pageSize: 50
                }

                //pagination functions
                $scope.setPagingData = function(data, page, pageSize) {
                    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
                    $scope.myData = pagedData;
                    $scope.totalServerItems = data.length;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                };
                $scope.getPagedDataAsync = function(pageSize, page, searchText) {
                    var data;
                    if (searchText) {
                        var ft = searchText.toLowerCase();
                        $http.get('data/data.json').success(function(allData) {
                            data = allData.filter(function(item) {
                                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(data, page, pageSize);
                        });
                    } else {
                        $http.get('data/data.json').success(function(allData) {
                            $scope.setPagingData(allData, page, pageSize);
                        });
                    }
                };

                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

                $scope.$watch('pagingOptions', function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                    }
                }, true);


                $scope.gridOptions = {
                    primaryKey: 'guid',
                    data: 'myData', //data set

                    //selection config
                    highlighting: true,
                    showSelectionCheckbox: true,
                    multiSelect: true,
                    selectWithCheckboxOnly: true,
                    
                    //filtering
                    filterOptions: $scope.filterOptions,
                    
                    //pagination
                    enablePaging: true,
                    pagingOptions: $scope.pagingOptions,
                    totalServerItems: 'totalServerItems',
                    showFooter: true,
                    
                    //plugins
                    plugins: [new ngGridFlexibleHeightPlugin()]
                };
            }]);
