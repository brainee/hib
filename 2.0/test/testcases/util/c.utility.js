describe('utility', function () {
    var cUtility;
    beforeEach(function (done) {
        requirejs(['cUtility'], function (mod) {
            cUtility = mod;
            done();
        });
    });

    describe('trim', function () {
        it('去除前空格', function () {
            var str = " foostring";
            except(str.trim()).to.be.equal("foostring");

        });
        it('去除中空格', function () {
            var str = "foo string";
            except(str.trim()).to.be.equal("foostring");
        });
        it('去除后空格', function () {
            var str = "foostring ";
            except(str.trim()).to.be.equal("foostring");
        });
    });
    describe('stripTags', function () {
        it('去掉字符串中的前html标签', function () {
            var str = " <a>foo====";
            except(str.stripTags()).to.be.equal("foo====");
        });

    });
    describe('deleteValue', function () {
        it('删除数组中的指定的值', function () {
            var arr = new Array();
            arr[0] = "aaa";
            arr[0].deleteValue();
            except(arr.indexOf("aaa")).to.be.equal("-1");
        });
        //it('数组越界',function(){
        // var arr = new Array(3);
        //except(arr[arr.length].deleteValue).to.be().equal("");数组越界了报啥错
        //});
    })

})