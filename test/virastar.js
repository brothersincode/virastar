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
    // it('should skip non-written tests', function () {});

    it('should replace kashidas to ndash in parenthetic', function () {
      assert.strictEqual(
        virastar.cleanup('ـ که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم ـ'),
        '– که در واقع پدرخوانده‌ام بود ولی من او را جای پدرم می‌دانستم –'
      );
    });

    it('should converts back html named character references', function () {
      assert.strictEqual(virastar.cleanup('&quot;گيومه های فارسي&quot;'), '«گیومه‌های فارسی»');
      assert.strictEqual(virastar.cleanup('&apos;گيومه های فارسي&apos;'), '«گیومه‌های فارسی»');
    });
  });
});
