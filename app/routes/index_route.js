ToDoFu.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('something', 1);
  }
});
