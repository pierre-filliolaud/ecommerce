(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('sub-category', {
            parent: 'entity',
            url: '/sub-category',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'SubCategories'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/sub-category/sub-categories.html',
                    controller: 'SubCategoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('sub-category-detail', {
            parent: 'entity',
            url: '/sub-category/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'SubCategory'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/sub-category/sub-category-detail.html',
                    controller: 'SubCategoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'SubCategory', function($stateParams, SubCategory) {
                    return SubCategory.get({id : $stateParams.id});
                }]
            }
        })
        .state('sub-category.new', {
            parent: 'sub-category',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sub-category/sub-category-dialog.html',
                    controller: 'SubCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                alcohol: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('sub-category', null, { reload: true });
                }, function() {
                    $state.go('sub-category');
                });
            }]
        })
        .state('sub-category.edit', {
            parent: 'sub-category',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sub-category/sub-category-dialog.html',
                    controller: 'SubCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SubCategory', function(SubCategory) {
                            return SubCategory.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('sub-category', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sub-category.delete', {
            parent: 'sub-category',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/sub-category/sub-category-delete-dialog.html',
                    controller: 'SubCategoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SubCategory', function(SubCategory) {
                            return SubCategory.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('sub-category', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
