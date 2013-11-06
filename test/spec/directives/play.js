'use strict';

describe('Directive: play', function () {

  // load the directive's module
  beforeEach(module('VernissageApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<play></play>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the play directive');
  }));
});
