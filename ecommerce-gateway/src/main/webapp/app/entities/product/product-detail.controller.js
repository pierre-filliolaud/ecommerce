(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Product', 'SubCategory', 'Brand'];

    function ProductDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Product, SubCategory, Brand) {
        var vm = this;
        vm.product = entity;
        
        var unsubscribe = $rootScope.$on('gatewayApp:productUpdate', function(event, result) {
            vm.product = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
