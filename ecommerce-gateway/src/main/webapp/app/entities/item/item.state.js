(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('item', {
            parent: 'entity',
            url: '/item',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Items'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/item/items.html',
                    controller: 'ItemController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('item-detail', {
            parent: 'entity',
            url: '/item/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Item'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/item/item-detail.html',
                    controller: 'ItemDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Item', function($stateParams, Item) {
                    return Item.get({id : $stateParams.id});
                }]
            }
        })
        .state('item.new', {
            parent: 'item',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/item/item-dialog.html',
                    controller: 'ItemDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                productId: null,
                                price: null,
                                login: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('item', null, { reload: true });
                }, function() {
                    $state.go('item');
                });
            }]
        })
        .state('item.edit', {
            parent: 'item',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/item/item-dialog.html',
                    controller: 'ItemDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Item', function(Item) {
                            return Item.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('item', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('item.delete', {
            parent: 'item',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/item/item-delete-dialog.html',
                    controller: 'ItemDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Item', function(Item) {
                            return Item.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('item', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
