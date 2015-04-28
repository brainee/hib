describe('cUtilityDate', function() {
  var UtilDate;

  beforeEach(function(done) {
    requirejs([
      'cUtilityDate',
    ], function(mod) {
      UtilDate = mod;
      done();
    });
  });

  describe('.diffMonth()', function () {
    it('传递时间戳', function() {
      var d1 = new Date(1405612800000);
      var d2 = new Date(1408118400000);
      var diff = UtilDate.diffMonth(d1, d2);

      expect(diff).to.be.equal(1);
    });


    it('传递时间对象', function() {
      var d1 = new Date(2014, 5, 3);
      var d2 = new Date(2014, 3, 8);
      var diff = UtilDate.diffMonth(d1, d2);

      expect(diff).to.be.equal(-2);
    });
  });
});