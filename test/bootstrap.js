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
GLOBAL.sauceUser = 'cb-onboarding';
GLOBAL.sauceKey = 'ffd251ca-2705-49fc-a824-50333dc99eeb';

capabilities.desiredCapabilities = {
    browserName: process.env._BROWSER || '',
    tags: []
}

if (process.env.TRAVIS_BUILD_ID) {
    capabilities.host = 'ondemand.saucelabs.com';
    capabilities.port = 80;
    capabilities.user = sauceUser;
    capabilities.key = sauceKey;
    capabilities.desiredCapabilities.tags = ['js', process.env._BROWSER || 'none'];
    capabilities.desiredCapabilities.name = 'onboarding test';

    if (process.env._MOBILETYPE) {
        capabilities.desiredCapabilities.platformVersion = process.env._PLATFORMVERSION;
        capabilities.desiredCapabilities.platformName = process.env._PLATFORMNAME;
        capabilities.desiredCapabilities.deviceName = (process.env._DEVICENAME || '').replace(/_/, ' ');
        capabilities.desiredCapabilities['appium-version'] = process.env._APPIUMVERSION;
        capabilities.desiredCapabilities.tags.push('appium');
        capabilities.desiredCapabilities.tags.push(process.env._MOBILETYPE);

        if (process.env._APP) {
            capabilities.desiredCapabilities.app = process.env._APP;
        }

    } else {
        capabilities.desiredCapabilities.platform = (process.env._PLATFORM || '').replace(/_/, ' ');
        capabilities.desiredCapabilities.version = process.env._VERSION;
        capabilities.desiredCapabilities.tags.push('webdriver');
    }
}

/**
 * initialize client instance
 */
GLOBAL.browser = webdriverjs.remote(capabilities);
before(function(done) {
    browser.init(done);
});