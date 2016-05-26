(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('CategoryDeleteController',CategoryDeleteController);

    CategoryDeleteController.$inject = ['$uibModalInstance', 'entity', 'Category'];

    function CategoryDeleteController($uibModalInstance, entity, Category) {
        var vm = this;
        vm.category = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Category.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
