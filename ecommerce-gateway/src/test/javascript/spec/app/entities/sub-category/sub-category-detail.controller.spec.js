'use strict';

describe('Controller Tests', function() {

    describe('SubCategory Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockSubCategory, MockProduct, MockCategory;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockSubCategory = jasmine.createSpy('MockSubCategory');
            MockProduct = jasmine.createSpy('MockProduct');
            MockCategory = jasmine.createSpy('MockCategory');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'SubCategory': MockSubCategory,
                'Product': MockProduct,
                'Category': MockCategory
            };
            createController = function() {
                $injector.get('$controller')("SubCategoryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'gatewayApp:subCategoryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
