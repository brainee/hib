describe('Lizard', function() {
  describe('.T()', function() {
    it('获取模板', function() {
      var html = $.trim(Lizard.T('viewportTmpl'));
      
      expect(html).to.be.equal('<div></div>');
    });

    /*it('模板嵌套', function() {
      var html = Lizard.T('listTemplate');

      html = _.template(html, {
        list: [
          { title: '酒店1' },
          { title: '酒店2' }
        ]
      });

    });*/
  });

  describe('.P()', function() {
    //location.href = 'http://ctrip.com/html5/search/index?k=1&from=http:/ctrip.com?a=1&b=3';
    //
    beforeEach(function(done) {
      Lizard.P.lizParam = {
        k: '1',
        from: 'http:/ctrip.com?a=1&b=3'
      };
      done();
    });

    it('获取单个参数', function() {
      var k = Lizard.P('k');
      var from = Lizard.P('from');
      var none = Lizard.P('none');

      expect(k).to.be.equal('1');
      expect(from).to.be.equal('http:/ctrip.com?a=1&b=3');
      expect(none).to.be.undefined;
    });

    it('获取整个参数', function() {
      var params = Lizard.P.lizParam;

      expect(params).to.be.deep.equal({
        k: '1',
        from: 'http:/ctrip.com?a=1&b=3'
      });
    });
  });

  // 获取localStorage, 主要是在模板的filter中使用
  describe('.S()', function() {
    var testStore;

    beforeEach(function(done) {
      requirejs(['cBase', 'cStore'], function(Base, Store) {
        var TestStore = new Base.Class(Store, {
          __propertys__: function () {
            this.key = 'test_data';
          }
        });
        testStore = new TestStore();
        testStore.set({
          k1: 'v1',
          k2: 'v2'
        });
        done();
      });
    });

    it('一个参数', function() {
      var data = Lizard.S('test_data');

      expect(data).to.be.deep.equal({
        k1: 'v1',
        k2: 'v2'
      });
    });

    it('两个参数', function() {
      var data = Lizard.S('test_data', 'k1');
      var none = Lizard.S('test_data', 'kk1');

      expect(data).to.be.equal('v1');
      expect(none).to.be.undefined;
    });

    it('三个参数', function() {
      var data = Lizard.S('test_data', 'k1', 1);
      var none = Lizard.S('test_data', 'kk1', 1);

      expect(data).to.be.equal('v1');
      expect(none).to.be.equal(1);
    });
    
    afterEach(function() {
      testStore.remove();
    });
  });

  // 数据请求依赖
  describe('.D()', function() {
    it('数据请求依赖', function() {
      
    });
  });
});