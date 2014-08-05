var SauceLabs = require('saucelabs');

after(function(done) {

    var mocha = this,
        sessionID = browser.requestHandler.sessionID;

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

        console.log('update status of job ID', sessionID, ',', 'status: ' + testPassed);
        sauceAccount.updateJob(sessionID, {
            passed: testPassed,
            public: true
        }, function(err, res) {
            done();
        });

    });

});