var employee = require('../services/employee-create'),
    sinon = require('sinon');

describe('employee', function() {
  it('should return true', function() {
      var e = new employee();
    var employeeMock = sinon.mock(e);
    employeeMock.expects('checkListUsername').withArgs('chim').returns(true);
     //employeeMock.expects('checkListUsername').once.withExactArgs('chim').returns(true);
    //employeeMock.expects('checkListUsername').once().withArgs('chim', true);
    e.checkListUsername();
    //incrementStoredData();
    //employeeMock.restore();
    employeeMock.verify();
    //assert(employeeMock.checkListUsernam());
  });
});
