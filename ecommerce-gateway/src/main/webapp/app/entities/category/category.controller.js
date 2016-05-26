(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', '$state', 'Category', 'CategorySearch'];

    function CategoryController ($scope, $state, Category, CategorySearch) {
        var vm = this;
        vm.categories = [];
        vm.loadAll = function() {
            Category.query(function(result) {
                vm.categories = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CategorySearch.query({query: vm.searchQuery}, function(result) {
                vm.categories = result;
            });
        };
        vm.loadAll();
        
    }
})();
