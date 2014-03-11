describe('example app test', function() {
  it('works', function() {
    var stub = sinon.stub().returns(true);
    expect(stub()).to.equal(true);
  });
});
