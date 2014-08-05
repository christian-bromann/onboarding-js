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

        sauceAccount.updateJob(client.requestHandler.sessionID, {
            passed: testPassed,
            public: true
        }, function(err, res) {
            done();
        });

    });

});