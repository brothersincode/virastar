/* global describe, it */

var assert = require('assert');
var Virastar = require('../lib/virastar.js');

describe('Virastar.js', function () {
  var virastar;

  it('should create new instance', function () {
    virastar = new Virastar();
  });

  describe('#cleanup()', function () {
    // some missing tests
    it('should skip non-written tests', function () {});

    it('should replace kashidas to ndash in parenthetic', function () {
      assert.equal(
        virastar.cleanup('ـ که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم ـ'),
        '– که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم –'
      );
    });
  });
});
