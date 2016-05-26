(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('CategoryDetailController', CategoryDetailController);

    CategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Category', 'SubCategory'];

    function CategoryDetailController($scope, $rootScope, $stateParams, entity, Category, SubCategory) {
        var vm = this;
        vm.category = entity;
        
        var unsubscribe = $rootScope.$on('gatewayApp:categoryUpdate', function(event, result) {
            vm.category = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
