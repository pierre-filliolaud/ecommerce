(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('SubCategoryDialogController', SubCategoryDialogController);

    SubCategoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SubCategory', 'Product', 'Category'];

    function SubCategoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SubCategory, Product, Category) {
        var vm = this;
        vm.subCategory = entity;
        vm.products = Product.query();
        vm.categories = Category.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('gatewayApp:subCategoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.subCategory.id !== null) {
                SubCategory.update(vm.subCategory, onSaveSuccess, onSaveError);
            } else {
                SubCategory.save(vm.subCategory, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
