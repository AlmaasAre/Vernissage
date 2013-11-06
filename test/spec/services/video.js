'use strict';

describe('Service: Video', function () {

  // load the service's module
  beforeEach(module('VernissageApp'));

  // instantiate service
  var Video;
  beforeEach(inject(function (_Video_) {
    Video = _Video_;
  }));

  it('should do something', function () {
    expect(!!Video).toBe(true);
  });

});
