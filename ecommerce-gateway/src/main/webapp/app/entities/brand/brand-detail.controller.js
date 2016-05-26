(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('BrandDetailController', BrandDetailController);

    BrandDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Brand', 'Product'];

    function BrandDetailController($scope, $rootScope, $stateParams, entity, Brand, Product) {
        var vm = this;
        vm.brand = entity;
        
        var unsubscribe = $rootScope.$on('gatewayApp:brandUpdate', function(event, result) {
            vm.brand = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
