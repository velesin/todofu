describe('example e2e test', function() {
  beforeEach(function() {
    ToDoFu.reset();
  });

  it('should work', function() {
    visit('/');
    andThen(function() {
      expect(find('h3').text()).to.equal('Hello from API');
    });
  });

  it('should work too', function() {
    visit('/');
    andThen(function() {
      expect(find('h2').text()).to.equal('Index v2');
    });
  });
});
