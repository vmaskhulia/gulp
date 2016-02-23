'use strict';

var _ = require('lodash');
var co = require('co');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-datetime'));
var testHelpers = require('../../../helpers/testHelpers');
var ResourceNotFoundError = require('../../../errors').ResourceNotFoundError;
var <%=nameC%> = require('../<%=name%>.dao');
var <%=nameC%>Stub = require('../../../stubs/<%=name%>.stub');


describe('<%=name%>.dao', () => {
  var <%=name%>Stub;

  before(co.wrap(function* () {
    testHelpers.connectDB();
    yield testHelpers.clearDB();
  }));

  beforeEach(() => {
    <%=name%>Stub = <%=nameC%>Stub.getSingle();
  });

  after(testHelpers.clearDB);


  // =============== getters ===============

  describe('#getAll()', () => {
    it('should get all <%=name%>s', co.wrap(function* () {
      var <%=name%>sData = _.range(10)
        .map(() => <%=nameC%>Stub.getSingle());

      yield <%=nameC%>.create(<%=name%>sData);

      var <%=name%>s = yield <%=nameC%>.getAll();

      expect(<%=name%>s).to.be.instanceof(Array);
      expect(<%=name%>s).to.have.length(<%=name%>sData.length);
    }));
  });

  describe('#getById()', () => {
    var <%=name%>;

    beforeEach(co.wrap(function* () {
      var created<%=nameC%> = yield <%=nameC%>.create(<%=name%>Stub);
      <%=name%> = yield <%=nameC%>.getById(created<%=nameC%>._id);
    }));

    it('should get <%=name%> by id', () => {
      expect(<%=name%>).to.be.an('object');
    });

    it('should throw error if <%=name%> was not found', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(<%=nameC%>.getById(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `<%=name%> (id "${dummyId}") was not found`);
    });
  });


  // =============== setters ===============

  describe('#create()', () => {
    var <%=name%>Data;
    var <%=name%>;

    beforeEach(co.wrap(function* () {
      <%=name%>Data = <%=name%>Stub;
      <%=name%> = yield <%=nameC%>.create(<%=name%>Data);
    }));

    it('should create <%=name%>', () => {
      expect(<%=name%>).to.be.an('object');
    });

    it('should contain proper fields', () => {
      expect(<%=name%>).to.have.property('myField', <%=name%>Data.myField);
    });
  });

  describe('#update()', () => {
    it('should update <%=name%>', co.wrap(function* () {
      var <%=name%> = yield <%=nameC%>.create(<%=name%>Stub);

      var newData = {
        myField: 'new-my-field',
      };

      yield <%=nameC%>.update(<%=name%>._id, newData);

      var updated<%=nameC%> = yield <%=nameC%>.getById(<%=name%>._id);

      expect(updated<%=nameC%>).to.have.property('myField', newData.myField);
    }));

    it('should throw error if passed <%=name%> does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;
      var newData = <%=name%>Stub;

      return expect(<%=nameC%>.update(dummyId, newData))
        .to.be.rejectedWith(ResourceNotFoundError, `could not update <%=name%> (id "${dummyId}")`);
    });
  });

  describe('#destroy()', () => {
    it('should destroy <%=name%>', co.wrap(function* () {
      var <%=name%> = yield <%=nameC%>.create(<%=name%>Stub);

      yield <%=nameC%>.destroy(<%=name%>._id);

      return expect(<%=nameC%>.getById(<%=name%>._id))
        .to.be.rejectedWith(ResourceNotFoundError, `<%=name%> (id "${<%=name%>._id}") was not found`);
    }));

    it('should throw error if passed <%=name%> does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(<%=nameC%>.destroy(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `could not destroy <%=name%> (id "${dummyId}")`);
    });
  });
});
