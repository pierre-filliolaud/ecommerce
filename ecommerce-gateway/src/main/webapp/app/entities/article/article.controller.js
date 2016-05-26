(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$scope', '$state', 'Article'];

    function ArticleController ($scope, $state, Article) {
        var vm = this;
        vm.articles = [];
        vm.loadAll = function() {
            Article.query(function(result) {
                vm.articles = result;
            });
        };

        vm.loadAll();
        
    }
})();
