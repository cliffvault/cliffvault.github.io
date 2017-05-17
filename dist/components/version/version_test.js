'use strict';

describe('appTmp.version module', function() {
  beforeEach(module('appTmp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
