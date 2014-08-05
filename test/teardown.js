var SauceLabs = require('saucelabs');

after(function(done) {

    var mocha = this;

    browser.end(function() {

        if (!process.env.TRAVIS_BUILD_ID) {
            return done();
        }

        var testPassed = true;

        mocha.currentTest.parent.tests.forEach(function(testcase) {
            testPassed = testcase.state === 'passed' && testPassed;
        });

        var sauceAccount = new SauceLabs({
            username: sauceUser,
            password: sauceKey
        });

        console.log('update status of job ID', browser.requestHandler.sessionID, ',', 'status: ' + testPassed);
        sauceAccount.updateJob(browser.requestHandler.sessionID, {
            passed: testPassed,
            public: true
        }, function(err, res) {
            done();
        });

    });

});