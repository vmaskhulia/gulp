'use strict';

const _ = require('lodash');
const co = require('co');
const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-datetime'));
const {expect} = chai;
const testHelpers = require('../../../helpers/testHelpers');
const {ResourceNotFoundError} = require('../../../errors');
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

  // =============== Getters ===============

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
        .map(i => <%=nameUC%>Stub.getSingle({
          <%=defField%>: (i % 2 === 0) ? 'value-a' : 'value-b'
        }));

      yield <%=nameUC%>.insertMany(<%=namePlural%>);
    }));

    it('should get all <%=namePlural%>', co.wrap(function* () {
      const {items, numTotal} = yield <%=nameUC%>.getByQuery({});
      expect(items).to.have.length(TOTAL_COUNT);
      expect(numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should filter <%=namePlural%> by find prop', co.wrap(function* () {
      const find = {<%=defField%>: 'value-a'};
      const {items, numTotal} = yield <%=nameUC%>.getByQuery({find});
      expect(items).to.have.length(TOTAL_COUNT / 2);
      expect(numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should filter <%=namePlural%> by or prop', co.wrap(function* () {
      const or = [{
        <%=defField%>: {$regex: 'value-a', $options: 'i'}
      }];
      const {items, numTotal} = yield <%=nameUC%>.getByQuery({or});
      expect(items).to.have.length(TOTAL_COUNT / 2);
      expect(numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should sort by ascending order', co.wrap(function* () {
      const sort = {<%=defField%>: 1};
      const {items, numTotal} = yield <%=nameUC%>.getByQuery({sort});
      expect(items).to.have.length(TOTAL_COUNT);
      for (let i = 1; i < items.length; i++) {
        expect(items[i].<%=defField%>).to.be.at.least(items[i - 1].<%=defField%>);
      }
      expect(numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should sort by descending order', co.wrap(function* () {
      const sort = {<%=defField%>: -1};
      const {items, numTotal} = yield <%=nameUC%>.getByQuery({sort});
      expect(items).to.have.length(TOTAL_COUNT);
      for (let i = 1; i < items.length; i++) {
        expect(items[i - 1].<%=defField%>).to.be.at.least(items[i].<%=defField%>);
      }
      expect(numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get all <%=namePlural%> after offset', co.wrap(function* () {
      const offset = 5;
      const {items, numTotal} = yield <%=nameUC%>.getByQuery({offset});
      expect(items).to.have.length(TOTAL_COUNT - offset);
      expect(numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get limited number of <%=namePlural%>', co.wrap(function* () {
      const limit = 9;
      const {items, numTotal} = yield <%=nameUC%>.getByQuery({limit});
      expect(items).to.have.length(limit);
      expect(numTotal).to.equal(TOTAL_COUNT);
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
        .to.be.rejectedWith(ResourceNotFoundError, `<%=nameUC%> (id ${dummyId}) was not found`);
    });
  });

  // =============== Setters ===============

  describe('#create()', () => {
    let baseProps;
    let <%=nameLC%>;

    beforeEach(co.wrap(function* () {
      baseProps = <%=nameLC%>Stub;
      <%=nameLC%> = yield <%=nameUC%>.create(baseProps);
    }));

    it('should create <%=nameLC%>', () => {
      expect(<%=nameLC%>).to.be.an('object');
    });

    it('should contain proper fields', () => {
      expectBasePropsToMatch(<%=nameLC%>, baseProps);
    });
  });

  describe('#update()', () => {
    it('should update <%=nameLC%>', co.wrap(function* () {
      const <%=nameLC%> = yield <%=nameUC%>.create(<%=nameLC%>Stub);

      const updatedProps = {
        <%=defField%>: 'new-my-prop',
      };

      yield <%=nameUC%>.update(<%=nameLC%>._id, updatedProps);

      const updated<%=nameUC%> = yield <%=nameUC%>.getById(<%=nameLC%>._id);

      expectBasePropsToMatch(updated<%=nameUC%>, updatedProps);
    }));

    it('should throw error if passed <%=nameLC%> does not exist', () => {
      const dummyId = testHelpers.DUMMY_ID;
      const updatedProps = <%=nameLC%>Stub;
      return expect(<%=nameUC%>.update(dummyId, updatedProps))
        .to.be.rejectedWith(ResourceNotFoundError, `Could not update <%=nameLC%> (id ${dummyId})`);
    });
  });

  describe('#destroy()', () => {
    it('should destroy <%=nameLC%>', co.wrap(function* () {
      const {_id} = yield <%=nameUC%>.create(<%=nameLC%>Stub);
      yield <%=nameUC%>.destroy(_id);
      return expect(<%=nameUC%>.getById(_id))
        .to.be.rejectedWith(ResourceNotFoundError, `<%=nameUC%> (id ${_id}) was not found`);
    }));

    it('should throw error if passed <%=nameLC%> does not exist', () => {
      const dummyId = testHelpers.DUMMY_ID;
      return expect(<%=nameUC%>.destroy(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `Could not destroy <%=nameLC%> (id ${dummyId})`);
    });
  });
});

function expectBasePropsToMatch(actual, expected) {
  expect(actual).to.have.property('<%=defField%>', expected.<%=defField%>);
}
