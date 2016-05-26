(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ProductDeleteController',ProductDeleteController);

    ProductDeleteController.$inject = ['$uibModalInstance', 'entity', 'Product'];

    function ProductDeleteController($uibModalInstance, entity, Product) {
        var vm = this;
        vm.product = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Product.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
