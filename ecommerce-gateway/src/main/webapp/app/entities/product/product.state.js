(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('product', {
            parent: 'entity',
            url: '/product',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Products'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/product/products.html',
                    controller: 'ProductController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('product-detail', {
            parent: 'entity',
            url: '/product/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Product'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/product/product-detail.html',
                    controller: 'ProductDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Product', function($stateParams, Product) {
                    return Product.get({id : $stateParams.id});
                }]
            }
        })
        .state('product.new', {
            parent: 'product',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product/product-dialog.html',
                    controller: 'ProductDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                image: null,
                                imageContentType: null,
                                price: null,
                                size: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('product', null, { reload: true });
                }, function() {
                    $state.go('product');
                });
            }]
        })
        .state('product.edit', {
            parent: 'product',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product/product-dialog.html',
                    controller: 'ProductDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Product', function(Product) {
                            return Product.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('product', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('product.delete', {
            parent: 'product',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product/product-delete-dialog.html',
                    controller: 'ProductDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Product', function(Product) {
                            return Product.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('product', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
