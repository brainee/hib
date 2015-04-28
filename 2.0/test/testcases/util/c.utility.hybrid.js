describe('hybird', function () {
    var Utility;
    beforeEach(function (done) {
        requirejs(['cUtilityHybird'], function (mod) {
            Utility = mod;
          done();
        });
    });
    
    describe('isInApp', function () {
       var Util = function(){};
       it('检查isInApp',function(){
          var useragent = window.navigator.userAgent;
          if (useragent.indexOf('CtripWireless') > -1) {
              /** 旧版本 */    
             var oldData = window.localStorage.getItem('isInApp');
             if(oldData==1){
                except(Util.isInApp()).to.be.true;
             }
              /** 新版本 */
             var data = window.localStorage.getItem('ISINAPP');
             if(oldData==1){
                except(Util.isInApp()).to.be.true;
             }
          }
       })
    });
    

})