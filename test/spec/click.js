describe('button1', function() {

    var selector_btn = process.env._MOBILETYPE === 'native' ? '//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAWebView[1]/UIAButton[1]' : '.btn1';
    var selector_btnClickedIndicator = process.env._MOBILETYPE === 'native' ? '//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAWebView[1]/UIAButton[1]' : '.btn1_clicked';

    before(function(done) {
        browser.url('http://webdriverjs.christian-bromann.com', done);
    });

    describe('on left click', function(done) {

        before(function(done) {
            browser.click(selector_btn).call(done);
        });

        it('should trigger label1 to get visible', function(done) {
            browser.isVisible(selector_btnClickedIndicator, function(err, isVisible) {
                expect(err).to.be.undefined;
                expect(isVisible).to.be.true;
            })
            .call(done);
        });

    });

})