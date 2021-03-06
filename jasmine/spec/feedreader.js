/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // loop in allFeeds object and ensures it has a URL defined and that the URL is not empty.

        it('URL defined and not empty',function () {
            allFeeds.forEach(function (key) {
                expect(key.url).toBeDefined();
                expect(key.url).not.toBe('');
            });

        });


        // loop in allFeeds object and ensures it has a name defined and that the name is not empty.

        it('The name is defined and not empty',function () {
            allFeeds.forEach(function (key) {
                expect(key.name).toBeDefined();
                expect(key.name).not.toBe('');
            });

        });
    });


    describe('The menu', function () {

        // test the menu element is hidden by default

        it('hidden by default',function () {

            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });


        // test that ensures the menu changes visibility when the menu icon is clicked
        // does the menu display when clicked and does it hide when clicked again.

        it('menu changes',function () {
            var menuIcon = $(".menu-icon-link");

            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).toBeFalsy();

            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });

    });


    describe('Initial Entries',function () {

        // loadFeed() is asynchronous so this test will require the use of Jasmine's beforeEach and asynchronous done
        beforeEach(function (done) {
            loadFeed(0,function () {
                done();
            });
        });

        // test that ensures when the loadFeed is completed

        it('test that ensures when the loadFeed',function (done) {

            var entryInfeed = $('.feed .entry').length;

            expect(entryInfeed).toBeGreaterThan(0);
            done();

        });

    });

    describe('New Feed Selection',function () {

        var feedloaded;

        // loadFeed() is asynchronous so this test will require the use of Jasmine's beforeEach and asynchronous done
        beforeEach(function (done) {
            loadFeed(0,function () {
                feedloaded = $(".feed").html();
                loadFeed(1,done);
            });
        });

        // test that ensures when a new feed is loaded

        it('A new feed is loaded',function (done) {
            expect($('.feed').html()).not.toBe(feedloaded);
            done();
        });



    });

}());
