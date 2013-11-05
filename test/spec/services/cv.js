'use strict';

describe('Service: Cv', function () {

  // load the service's module
  beforeEach(module('VernissageApp'));

  // instantiate service
  var Cv;
  beforeEach(inject(function (_Cv_) {
    Cv = _Cv_;
  }));

  it('should do something', function () {
    expect(!!Cv).toBe(true);
  });

});
