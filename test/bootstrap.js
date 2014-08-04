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

capabilities.desiredCapabilities = {
    browserName: process.env._BROWSER
}

if(process.env.TRAVIS_BUILD_ID) {
    capabilities.host = 'ondemand.saucelabs.com';
    capabilities.port = 80;
    capabilities.user = 'cb-onboarding';
    capabilities.key  = 'ffd251ca-2705-49fc-a824-50333dc99eeb';
    capabilities.desiredCapabilities.platform = process.env._PLATFORM.replace(/_/, ' ');
    capabilities.desiredCapabilities.version  = process.env._VERSION;
    capabilities.desiredCapabilities.tags = ['js', process.env._BROWSER];
    capabilities.desiredCapabilities.name = 'onboarding test';
}

/**
 * initialize client instance
 */
GLOBAL.browser = webdriverjs.remote(capabilities);
before(function(done) {
    browser.init(done);
});