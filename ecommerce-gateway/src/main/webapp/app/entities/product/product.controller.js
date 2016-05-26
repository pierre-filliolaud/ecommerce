(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$scope', '$state', 'DataUtils', 'Product', 'ProductSearch'];

    function ProductController ($scope, $state, DataUtils, Product, ProductSearch) {
        var vm = this;
        vm.products = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.loadAll = function() {
            Product.query(function(result) {
                vm.products = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ProductSearch.query({query: vm.searchQuery}, function(result) {
                vm.products = result;
            });
        };
        vm.loadAll();
        
    }
})();
