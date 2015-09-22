'use strict';

describe('Service: charachteristikaValue', function () {

  // load the service's module
  beforeEach(module('rpTrainingApp'));

  // instantiate service
  var charachteristikaValue;
  beforeEach(inject(function (_charachteristikaValue_) {
    charachteristikaValue = _charachteristikaValue_;
  }));

  it('should do something', function () {
    expect(!!charachteristikaValue).toBe(true);
  });

});
