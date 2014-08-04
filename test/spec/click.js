describe('button1', function() {

    before(function(done) {
        browser.url('http://webdriverjs.christian-bromann.com', done);
    });

    describe('on left click', function(done) {

        before(function(done) {
            browser.click('.btn1').call(done);
        });

        it('should trigger label1 to get visible', function(done) {
            browser.isVisible('.btn1_clicked', function(err, isVisible) {
                expect(err).to.be.null;
                expect(isVisible).to.be.true;
            })
            .call(done);
        });

    });

})