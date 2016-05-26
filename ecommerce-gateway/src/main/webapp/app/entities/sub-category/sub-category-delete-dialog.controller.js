(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('SubCategoryDeleteController',SubCategoryDeleteController);

    SubCategoryDeleteController.$inject = ['$uibModalInstance', 'entity', 'SubCategory'];

    function SubCategoryDeleteController($uibModalInstance, entity, SubCategory) {
        var vm = this;
        vm.subCategory = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            SubCategory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
