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
       it('���isInApp',function(){
          var useragent = window.navigator.userAgent;
          if (useragent.indexOf('CtripWireless') > -1) {
              /** �ɰ汾 */    
             var oldData = window.localStorage.getItem('isInApp');
             if(oldData==1){
                except(Util.isInApp()).to.be.true;
             }
              /** �°汾 */
             var data = window.localStorage.getItem('ISINAPP');
             if(oldData==1){
                except(Util.isInApp()).to.be.true;
             }
          }
       })
    });
    

})