'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngGrid', 'ui.bootstrap'])
        .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
                //configure grid
                $scope.selection=[];
                $scope.columnDefs=[
                    {field: 'id', displayName:'ID', width: 30, visible: false},  
                    {field: 'guid', visible: false},  
                    {field: 'isActive', visible: false, }, 
                    {field: 'balance', displayName:'Balance', visible: false},  
                    {field: 'eyeColor', displayName:'Eye Color', visible: false}, 
                    {field: 'about', displayName:'About', visible: false},
                    {field: 'registered', displayName:'Registered', width: 150, visible: false} ,
                    {field: 'age', displayName:'Age', width: 40, visible: false},
                     
                    {field: 'picture', displayName:'', width: 40, cellTemplate: 'templates/avatarCellTemplate.html'},                    
                    {field: 'name', displayName:'Name', width: 150},  
                    {field: 'company', displayName:'Company', width: 150},                                
                    {field: 'address', displayName:'Address'},
                    {field: 'gender', displayName:'', width: 32, cellTemplate: 'templates/genderCellTemplate.html'},                                         
                    {field: 'email', displayName:'', width: 36, cellTemplate: 'templates/mailCellTemplate.html'},  
                    {field: 'phone', displayName:'', width: 36, cellTemplate: 'templates/phoneCellTemplate.html'}                                         
                ];
                $scope.filterOptions = {
                    filterText: ''
                };

                $scope.pagingOptions = {
                    currentPage: 1,
                    pageSizes: [10, 20, 50, 100, 200],
                    pageSize: 20
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
                $scope.$watch('filterOptions', function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                    }
                }, true);
                
                //row details
                $scope.showRowDetails=function(row){
                    $scope.row=row.entity;
                    angular.element('#row-details').css('display','block');
                }
                
                //filter: hide inactive rows
                $scope.hideInactive=function(){
                    if ($scope.filterOptions.filterText==='') $scope.filterOptions.filterText='true';
                    else $scope.filterOptions.filterText='';
                }

                $scope.gridOptions = {
                    primaryKey: 'guid',
                    data: 'myData', //data set
                    columnDefs: $scope.columnDefs,
                    selectedRows: $scope.selection,
                    
                    //teplates
                    rowTemplate: 'templates/rowTemplate.html',
//                    footerTemplate: 'templates/footerTemplate.html',

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
