(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', '$state', 'Item'];

    function ItemController ($scope, $state, Item) {
        var vm = this;
        vm.items = [];
        vm.loadAll = function() {
            Item.query(function(result) {
                vm.items = result;
            });
        };

        vm.loadAll();
        
    }
})();
