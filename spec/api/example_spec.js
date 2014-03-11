describe('example api test', function() {
  it('works', function() {
    var stub = sinon.stub().returns(true);
    expect(stub()).to.equal(true);
  });
});
