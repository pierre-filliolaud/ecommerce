(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ItemDetailController', ItemDetailController);

    ItemDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Item'];

    function ItemDetailController($scope, $rootScope, $stateParams, entity, Item) {
        var vm = this;
        vm.item = entity;
        
        var unsubscribe = $rootScope.$on('gatewayApp:itemUpdate', function(event, result) {
            vm.item = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
