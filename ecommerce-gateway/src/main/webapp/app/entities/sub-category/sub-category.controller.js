(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('SubCategoryController', SubCategoryController);

    SubCategoryController.$inject = ['$scope', '$state', 'SubCategory', 'SubCategorySearch'];

    function SubCategoryController ($scope, $state, SubCategory, SubCategorySearch) {
        var vm = this;
        vm.subCategories = [];
        vm.loadAll = function() {
            SubCategory.query(function(result) {
                vm.subCategories = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            SubCategorySearch.query({query: vm.searchQuery}, function(result) {
                vm.subCategories = result;
            });
        };
        vm.loadAll();
        
    }
})();
