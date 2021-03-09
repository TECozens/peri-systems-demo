let assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('ES6 Compatibility', () => {
    it('should return true if compatible', () => {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});