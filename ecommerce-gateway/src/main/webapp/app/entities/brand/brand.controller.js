(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('BrandController', BrandController);

    BrandController.$inject = ['$scope', '$state', 'Brand', 'BrandSearch'];

    function BrandController ($scope, $state, Brand, BrandSearch) {
        var vm = this;
        vm.brands = [];
        vm.loadAll = function() {
            Brand.query(function(result) {
                vm.brands = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            BrandSearch.query({query: vm.searchQuery}, function(result) {
                vm.brands = result;
            });
        };
        vm.loadAll();
        
    }
})();
