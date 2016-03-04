'use strict';

var _ = require('lodash');
var co = require('co');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-datetime'));
var testHelpers = require('../../../helpers/testHelpers');
var ResourceNotFoundError = require('../../../errors').ResourceNotFoundError;
var <%=nameUC%> = require('../<%=nameLC%>.dao');
var <%=nameUC%>Stub = require('../../../stubs/<%=nameLC%>.stub');


describe('<%=nameLC%>.dao', () => {
  var <%=nameLC%>Stub;

  before(co.wrap(function* () {
    testHelpers.connectDB();
    yield testHelpers.clearDB();
  }));

  beforeEach(() => {
    <%=nameLC%>Stub = <%=nameUC%>Stub.getSingle();
  });

  after(testHelpers.clearDB);


  // =============== getters ===============

  describe('#getAll()', () => {
    it('should get all <%=namePlural%>', co.wrap(function* () {
      var <%=namePlural%>Data = _.range(10)
        .map(() => <%=nameUC%>Stub.getSingle());

      yield <%=nameUC%>.create(<%=namePlural%>Data);

      var <%=namePlural%> = yield <%=nameUC%>.getAll();

      expect(<%=namePlural%>).to.be.instanceof(Array);
      expect(<%=namePlural%>).to.have.length(<%=namePlural%>Data.length);
    }));
  });

  describe('#getById()', () => {
    var <%=nameLC%>;

    beforeEach(co.wrap(function* () {
      var created<%=nameUC%> = yield <%=nameUC%>.create(<%=nameLC%>Stub);
      <%=nameLC%> = yield <%=nameUC%>.getById(created<%=nameUC%>._id);
    }));

    it('should get <%=nameLC%> by id', () => {
      expect(<%=nameLC%>).to.be.an('object');
    });

    it('should throw error if <%=nameLC%> was not found', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(<%=nameUC%>.getById(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `<%=nameLC%> (id "${dummyId}") was not found`);
    });
  });


  // =============== setters ===============

  describe('#create()', () => {
    var <%=nameLC%>Data;
    var <%=nameLC%>;

    beforeEach(co.wrap(function* () {
      <%=nameLC%>Data = <%=nameLC%>Stub;
      <%=nameLC%> = yield <%=nameUC%>.create(<%=nameLC%>Data);
    }));

    it('should create <%=nameLC%>', () => {
      expect(<%=nameLC%>).to.be.an('object');
    });

    it('should contain proper fields', () => {
      expect(<%=nameLC%>).to.have.property('myField', <%=nameLC%>Data.myField);
    });
  });

  describe('#update()', () => {
    it('should update <%=nameLC%>', co.wrap(function* () {
      var <%=nameLC%> = yield <%=nameUC%>.create(<%=nameLC%>Stub);

      var newData = {
        myField: 'new-my-field',
      };

      yield <%=nameUC%>.update(<%=nameLC%>._id, newData);

      var updated<%=nameUC%> = yield <%=nameUC%>.getById(<%=nameLC%>._id);

      expect(updated<%=nameUC%>).to.have.property('myField', newData.myField);
    }));

    it('should throw error if passed <%=nameLC%> does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;
      var newData = <%=nameLC%>Stub;

      return expect(<%=nameUC%>.update(dummyId, newData))
        .to.be.rejectedWith(ResourceNotFoundError, `could not update <%=nameLC%> (id "${dummyId}")`);
    });
  });

  describe('#destroy()', () => {
    it('should destroy <%=nameLC%>', co.wrap(function* () {
      var <%=nameLC%> = yield <%=nameUC%>.create(<%=nameLC%>Stub);

      yield <%=nameUC%>.destroy(<%=nameLC%>._id);

      return expect(<%=nameUC%>.getById(<%=nameLC%>._id))
        .to.be.rejectedWith(ResourceNotFoundError, `<%=nameLC%> (id "${<%=nameLC%>._id}") was not found`);
    }));

    it('should throw error if passed <%=nameLC%> does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(<%=nameUC%>.destroy(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `could not destroy <%=nameLC%> (id "${dummyId}")`);
    });
  });
});
