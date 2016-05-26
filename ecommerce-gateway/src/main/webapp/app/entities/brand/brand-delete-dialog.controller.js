(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('BrandDeleteController',BrandDeleteController);

    BrandDeleteController.$inject = ['$uibModalInstance', 'entity', 'Brand'];

    function BrandDeleteController($uibModalInstance, entity, Brand) {
        var vm = this;
        vm.brand = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Brand.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
