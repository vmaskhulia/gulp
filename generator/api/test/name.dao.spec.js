'use strict';

const _ = require('lodash');
const co = require('co');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-datetime'));
const testHelpers = require('../../../helpers/testHelpers');
const ResourceNotFoundError = require('../../../errors').ResourceNotFoundError;
const <%=nameUC%> = require('../<%=nameLC%>.dao');
const <%=nameUC%>Stub = require('../../../stubs/<%=nameLC%>.stub');

describe('<%=nameLC%>.dao', () => {
  let <%=nameLC%>Stub;

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
      const <%=namePlural%>Data = _.range(10)
        .map(() => <%=nameUC%>Stub.getSingle());

      yield <%=nameUC%>.create(<%=namePlural%>Data);

      const <%=namePlural%> = yield <%=nameUC%>.getAll();

      expect(<%=namePlural%>).to.be.instanceof(Array);
      expect(<%=namePlural%>).to.have.length(<%=namePlural%>Data.length);
    }));
  });

  describe('#getByQuery()', () => {
    const TOTAL_COUNT = 24;

    before(co.wrap(function* () {
      yield <%=nameUC%>.destroyAll();

      const <%=namePlural%> = _.range(TOTAL_COUNT)
        .map(i => {
          const stub = <%=nameUC%>Stub.getSingle();
          stub.<%=defField%> = (i % 2 === 0) ? 'value-a' : 'value-b';
          return stub;
        });

      yield <%=nameUC%>.insertMany(<%=namePlural%>);
    }));

    it('should get all <%=namePlural%> by findQuery', co.wrap(function* () {
      const data = yield <%=nameUC%>.getByQuery({}, [{}], {}, 0, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get part of <%=namePlural%> by findQuery', co.wrap(function* () {
      const data = yield <%=nameUC%>.getByQuery({<%=defField%>: 'value-a'}, [{}], {}, 0, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT / 2);
      expect(data.numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should get all <%=namePlural%> by orQuery', co.wrap(function* () {
      const orQuery = [{
        <%=defField%>: {$regex: 'value-a', $options: 'i'}
      }, {
        <%=defField%>: {$regex: 'value-b', $options: 'i'}
      }];

      const data = yield <%=nameUC%>.getByQuery({}, orQuery, {}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get part of <%=namePlural%> by orQuery', co.wrap(function* () {
      const orQuery = [{
        <%=defField%>: {$regex: 'value-a', $options: 'i'}
      }];

      const data = yield <%=nameUC%>.getByQuery({}, orQuery, {}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT / 2);
      expect(data.numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should sort by ascending order', co.wrap(function* () {
      const data = yield <%=nameUC%>.getByQuery({}, [{}], {<%=defField%>: 1}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);

      for (let i = 1; i < data.items.length; i++) {
        expect(data.items[i].<%=defField%>).to.be.at.least(data.items[i - 1].<%=defField%>);
      }

      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should sort by descending order', co.wrap(function* () {
      const data = yield <%=nameUC%>.getByQuery({}, [{}], {<%=defField%>: -1}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);

      for (let i = 1; i < data.items.length; i++) {
        expect(data.items[i - 1].<%=defField%>).to.be.at.least(data.items[i].<%=defField%>);
      }

      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get all <%=namePlural%> after offset', co.wrap(function* () {
      const offset = 5;
      const data = yield <%=nameUC%>.getByQuery({}, [{}], {}, offset, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT - offset);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get limited number of <%=namePlural%>', co.wrap(function* () {
      const limit = 9;
      const data = yield <%=nameUC%>.getByQuery({}, [{}], {}, 0, limit);
      expect(data.items).to.have.length(limit);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));
  });

  describe('#getById()', () => {
    let <%=nameLC%>;

    beforeEach(co.wrap(function* () {
      const created<%=nameUC%> = yield <%=nameUC%>.create(<%=nameLC%>Stub);
      <%=nameLC%> = yield <%=nameUC%>.getById(created<%=nameUC%>._id);
    }));

    it('should get <%=nameLC%> by id', () => {
      expect(<%=nameLC%>).to.be.an('object');
    });

    it('should throw error if <%=nameLC%> was not found', () => {
      const dummyId = testHelpers.DUMMY_ID;

      return expect(<%=nameUC%>.getById(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `<%=nameLC%> (id "${dummyId}") was not found`);
    });
  });


  // =============== setters ===============

  describe('#create()', () => {
    let <%=nameLC%>Data;
    let <%=nameLC%>;

    beforeEach(co.wrap(function* () {
      <%=nameLC%>Data = <%=nameLC%>Stub;
      <%=nameLC%> = yield <%=nameUC%>.create(<%=nameLC%>Data);
    }));

    it('should create <%=nameLC%>', () => {
      expect(<%=nameLC%>).to.be.an('object');
    });

    it('should contain proper fields', () => {
      expectBaseFieldsToMatch(<%=nameLC%>, <%=nameLC%>Data);
    });
  });

  describe('#update()', () => {
    it('should update <%=nameLC%>', co.wrap(function* () {
      const <%=nameLC%> = yield <%=nameUC%>.create(<%=nameLC%>Stub);

      const newData = {
        <%=defField%>: 'new-my-field',
      };

      yield <%=nameUC%>.update(<%=nameLC%>._id, newData);

      const updated<%=nameUC%> = yield <%=nameUC%>.getById(<%=nameLC%>._id);

      expectBaseFieldsToMatch(updated<%=nameUC%>, newData);
    }));

    it('should throw error if passed <%=nameLC%> does not exist', () => {
      const dummyId = testHelpers.DUMMY_ID;
      const newData = <%=nameLC%>Stub;

      return expect(<%=nameUC%>.update(dummyId, newData))
        .to.be.rejectedWith(ResourceNotFoundError, `could not update <%=nameLC%> (id "${dummyId}")`);
    });
  });

  describe('#destroy()', () => {
    it('should destroy <%=nameLC%>', co.wrap(function* () {
      const <%=nameLC%> = yield <%=nameUC%>.create(<%=nameLC%>Stub);

      yield <%=nameUC%>.destroy(<%=nameLC%>._id);

      return expect(<%=nameUC%>.getById(<%=nameLC%>._id))
        .to.be.rejectedWith(ResourceNotFoundError, `<%=nameLC%> (id "${<%=nameLC%>._id}") was not found`);
    }));

    it('should throw error if passed <%=nameLC%> does not exist', () => {
      const dummyId = testHelpers.DUMMY_ID;

      return expect(<%=nameUC%>.destroy(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `could not destroy <%=nameLC%> (id "${dummyId}")`);
    });
  });
});

function expectBaseFieldsToMatch(actual, expected) {
  expect(actual).to.have.property('<%=defField%>', expected.<%=defField%>);
}
