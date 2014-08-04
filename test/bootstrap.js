/**
 * initialize chai
 */
GLOBAL.chai = require('chai');
GLOBAL.expect = chai.expect;
GLOBAL.assert = chai.assert;
chai.should();

/**
 * initialize webdriverio
 * (haven't published webdriverio yet so instead I am going to use webdriverjs)
 */
GLOBAL.webdriverjs = require('webdriverjs');

var capabilities = {}

if(process.env.TRAVIS_BUILD_ID) {
    capabilities.user = 'cb-onboarding-js';
    capabilities.key  = 'XXX';
}

capabilities.desiredCapabilities = {
    browserName: process.env.BROWSER
}

/**
 * initialize client instance
 */
GLOBAL.browser = webdriverjs.remote(capabilities);
before(function(done) {
    browser.init(done);
});