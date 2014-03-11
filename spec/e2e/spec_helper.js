expect = chai.expect;

document.write('<div id="e2e-fixture"></div>');

Ember.Test.adapter = Ember.Test.MochaAdapter.create();

ToDoFu.rootElement = '#e2e-fixture';
ToDoFu.setupForTesting();
ToDoFu.injectTestHelpers();
