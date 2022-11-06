import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import server from '../../app';
import { getUser } from '../mocks/usersMock';
import MongoModel from '../../database/models/MongoModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('User route tests', () => {
  beforeEach(() => {
    sinon.stub(MongoModel.prototype, 'readOne').resolves(getUser);
    sinon.stub(MongoModel.prototype, 'update').resolves(getUser);
    sinon.stub(MongoModel.prototype, 'delete').resolves();
  });

  afterEach(() => sinon.restore());

  it('Get user by id', async () => {
    await chai.request(server.app)
      .get('/user/634b2a53c85bdce2fbb81e69')
      .then(({ status, body }) => {
        expect(status).to.be.eq(200);
        expect(body).to.be.deep.eq(getUser);
      });
  });

  it('Update user', async () => {
    await chai.request(server.app)
      .put('/user/634b2a53c85bdce2fbb81e69')
      .send({ firstName: "Update" })
      .then(({ status, body }) => {
        expect(status).to.be.eq(200);
        expect(body).to.be.an('object');
      });
  });

  it('Delete user', async () => {
    await chai.request(server.app)
      .delete('/user/634b2a53c85bdce2fbb81e69')
      .then(({ status }) => {
        expect(status).to.be.eq(204);
      });
  });
});
