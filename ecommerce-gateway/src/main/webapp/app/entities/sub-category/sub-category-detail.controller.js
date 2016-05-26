(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('SubCategoryDetailController', SubCategoryDetailController);

    SubCategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'SubCategory', 'Product', 'Category'];

    function SubCategoryDetailController($scope, $rootScope, $stateParams, entity, SubCategory, Product, Category) {
        var vm = this;
        vm.subCategory = entity;
        
        var unsubscribe = $rootScope.$on('gatewayApp:subCategoryUpdate', function(event, result) {
            vm.subCategory = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
