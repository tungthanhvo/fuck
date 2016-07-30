var search = require('../services/employee_search_service');
var sinon = require('sinon');

// var e = new search();
// var spy = sinon.spy(e,'searchUser');
// e.searchUser('');
// console.log('--------'+spy.callCount);
// spy.restore();

test('should call setModel once', function () {
  var e = new search();
  var set = sinon.spy(e, 'setModel');

  e.setModel();
  set.withArgs('data');
  set.restore();
  sinon.assert.calledOnce(set);
});


test('should call searchUser once', sinon.test(function () {
  var e = new search();
  var set = sinon.stub(e, 'searchUser');
  //searchUser.yields();
  var a = sinon.spy();
  e.searchUser('chim');
  set.restore();
  sinon.assert.calledOnce(set);
  //sinon.assert.callWith(e, 'chim');
}));

// suite(
  

// )

suite('#search1', function () {
  test('should search all', function () {
    var e = new search();
    var searchMock = sinon.mock(e);
    searchMock.expects('setModel').withArgs('data').returns(false);
    searchMock.expects('searchUser').once().withArgs('chim', null);

    e.setModel('data');
    e.searchUser('chim', null);

    searchMock.restore();
    searchMock.verify();
  });
});


// describe('employee', function() {
//     it('should return true', function() {
//         var e = new search();
//         var employeeMock = sinon.mock(e);
//         employeeMock.expects('searchUser').withArgs('chim').returns(true);
//         //employeeMock.expects('checkListUsername').once.withExactArgs('chim').returns(true);
//         //employeeMock.expects('checkListUsername').once().withArgs('chim', true);
//         e.checkListUsername();
//         //incrementStoredData();
//         //employeeMock.restore();
//         employeeMock.verify();
//         //assert(employeeMock.checkListUsernam());
//     });

// });