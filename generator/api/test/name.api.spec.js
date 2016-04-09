'use strict';

/*
var co = require('co');
var testHelpers = require('../../../helpers/testHelpers');
var agents = require('../../users/test/agents');
var <%=nameUC%>Stub = require('../../../stubs/<%=nameLC%>.stub');


describe('api/<%=namePlural%>', () => {
  let guestAgent = agents.getGuestAgent();
  let clientAgent = agents.getClientAgent();
  let adminAgent = agents.getAdminAgent();

  before(co.wrap(function* () {
    testHelpers.connectDB();
    yield testHelpers.clearDB();

    yield clientAgent.authorize();
    yield adminAgent.authorize();
  });

  after(testHelpers.clearDB);

  // =============== GET ===============

  describe('GET /', () => {
    let route = '/api/<%=namePlural%>';

    it('should return 200 for guest', (done) => {
      guestAgent.get(route).expect(200, done);
    });

    it('should return 200 for client', (done) => {
      clientAgent.get(route).expect(200, done);
    });

    it('should return 200 for admin', (done) => {
      adminAgent.get(route).expect(200, done);
    });
  });

 // =============== POST ===============

  describe('POST /', () => {
    let route = '/api/<%=namePlural%>';
    let <%=nameLC%>Stub;

    beforeEach(() => {
      <%=nameLC%>Stub = <%=nameUC%>Stub.getSingle();
    });

    it('should return 401 for guest', (done) => {
      guestAgent.post(route).send(<%=nameLC%>Stub).expect(401, done);
    });

    it('should return 401 for client', (done) => {
      clientAgent.post(route).send(<%=nameLC%>Stub).expect(401, done);
    });

    it('should return 201 for admin', (done) => {
      adminAgent.post(route).send(<%=nameLC%>Stub).expect(201, done);
    });
  });
});
*/
