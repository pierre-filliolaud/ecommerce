(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ItemDeleteController',ItemDeleteController);

    ItemDeleteController.$inject = ['$uibModalInstance', 'entity', 'Item'];

    function ItemDeleteController($uibModalInstance, entity, Item) {
        var vm = this;
        vm.item = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Item.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
