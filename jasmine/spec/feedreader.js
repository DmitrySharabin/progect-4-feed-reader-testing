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


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', () => {
           allFeeds.forEach(feed => {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });
         });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', () => {
          allFeeds.forEach(feed => {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          });
        });
    });


    /* This suite is all about the menu and its behaviour. */
    describe('The menu', () => {

        /* This test ensures the menu element is hidden by default. */
        it('is hidden by default', () => {
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes visibility
          * when the menu icon is clicked.
          */
        it('changes visibility when the menu icon is clicked', () => {

          // Expect the menu displays when clicked
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);

          // Expect the menu hides when clicked again
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This test suite checks whether function LoadFeed works properly. */
    describe('Initial Entries', () => {

        /* This test ensures that when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container.
         * Caution: loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach((done) => {
          try {
            loadFeed(0, () => {
              // Count number of entries in the feed
              this.numOfEntries = $('.feed').find('.entry').length;
              done();
            });
          } catch(e) {
            done.fail(e);
          }
        });

        it('when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container', () => {
          // Check whether expected variable is defined
          expect(this.numOfEntries).toBeDefined();
          expect(this.numOfEntries).toBeGreaterThan(0);
        });
    });

    /* This test suite checks whether data loads properly. */
    describe('New Feed Selection', () => {

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         */
        beforeEach((done) => {
          try {
            loadFeed(1, () => {
              // Save the first feed title
              this.firstTitle = $('.header-title').text();
              // Save feeds texts into array
              this.firstFeeds = [];
              $('article.entry h2').each((index, feed) => {
                this.firstFeeds.push(feed.textContent);
              });
              // Load another feed
              try {
                loadFeed(0, () => {
                  // save its title
                  this.secondTitle = $('.header-title').text();
                  // and the first feed
                  this.oneFeedFromOtherFeeds = $('article.entry h2').first().text();
                  done();
                });
              } catch(e) {
                done.fail(e);
              }
            });
          } catch(e) {
            done.fail(e);
          }
        });

        it('when a new feed is loaded by the loadFeed function, the content actually changes', () => {
          // Check whether expected variables are defined
          expect(this.firstTitle).toBeDefined();
          expect(this.secondTitle).toBeDefined();
          expect(this.firstFeeds).toBeDefined();
          expect(this.oneFeedFromOtherFeeds).toBeDefined();

          // Check whether titles of different feeds are different
          expect(this.firstTitle).not.toBe(this.secondTitle);

          // Check whether this.oneFeedFromOtherFeeds is not in this.firstFeeds
          expect(this.firstFeeds).not.toContain(this.oneFeedFromOtherFeeds);
        });
    });
}());
