(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('brand', {
            parent: 'entity',
            url: '/brand',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Brands'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/brand/brands.html',
                    controller: 'BrandController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('brand-detail', {
            parent: 'entity',
            url: '/brand/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Brand'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/brand/brand-detail.html',
                    controller: 'BrandDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Brand', function($stateParams, Brand) {
                    return Brand.get({id : $stateParams.id});
                }]
            }
        })
        .state('brand.new', {
            parent: 'brand',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/brand/brand-dialog.html',
                    controller: 'BrandDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                brandName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('brand', null, { reload: true });
                }, function() {
                    $state.go('brand');
                });
            }]
        })
        .state('brand.edit', {
            parent: 'brand',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/brand/brand-dialog.html',
                    controller: 'BrandDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Brand', function(Brand) {
                            return Brand.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('brand', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('brand.delete', {
            parent: 'brand',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/brand/brand-delete-dialog.html',
                    controller: 'BrandDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Brand', function(Brand) {
                            return Brand.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('brand', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
