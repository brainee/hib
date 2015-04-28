describe('utility', function () {
    var cUtility;
    beforeEach(function (done) {
        requirejs(['cUtility'], function (mod) {
            cUtility = mod;
            done();
        });
    });

    describe('trim', function () {
        it('ȥ��ǰ�ո�', function () {
            var str = " foostring";
            except(str.trim()).to.be.equal("foostring");

        });
        it('ȥ���пո�', function () {
            var str = "foo string";
            except(str.trim()).to.be.equal("foostring");
        });
        it('ȥ����ո�', function () {
            var str = "foostring ";
            except(str.trim()).to.be.equal("foostring");
        });
    });
    describe('stripTags', function () {
        it('ȥ���ַ����е�ǰhtml��ǩ', function () {
            var str = " <a>foo====";
            except(str.stripTags()).to.be.equal("foo====");
        });

    });
    describe('deleteValue', function () {
        it('ɾ�������е�ָ����ֵ', function () {
            var arr = new Array();
            arr[0] = "aaa";
            arr[0].deleteValue();
            except(arr.indexOf("aaa")).to.be.equal("-1");
        });
        //it('����Խ��',function(){
        // var arr = new Array(3);
        //except(arr[arr.length].deleteValue).to.be().equal("");����Խ���˱�ɶ��
        //});
    })

})