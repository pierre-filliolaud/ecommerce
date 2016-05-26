(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ArticleDeleteController',ArticleDeleteController);

    ArticleDeleteController.$inject = ['$uibModalInstance', 'entity', 'Article'];

    function ArticleDeleteController($uibModalInstance, entity, Article) {
        var vm = this;
        vm.article = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Article.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
