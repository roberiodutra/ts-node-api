import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import server from '../../app';
import User from '../../database/models/User';
import { getUser, signInUser, sign } from '../mocks/usersMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Sign in route tests', () => {
  afterEach(() => sinon.restore());

  it('On success', async () => {
    sinon.stub(User, 'readByEmail').resolves(getUser);
    await chai.request(server.app)
      .post('/sign_in')
      .send(signInUser)
      .then(({ status, body }) => {
        expect(status).to.be.eq(200);
        expect(body).to.haveOwnProperty("token");
        expect(body).to.be.deep.eq({ ...sign, token: body.token });
      });
  });

  it('When email is wrong', async () => {
    sinon.stub(User, 'readByEmail').resolves();
    await chai.request(server.app)
      .post('/sign_in')
      .send({ ...signInUser, email: "wrong" })
      .then(({ status, body }) => {
        expect(status).to.be.eq(404);
        expect(body.message).to.be.eq("User Not found");
      });
  });

  it('When invalid password', async () => {
    sinon.stub(User, 'readByEmail').resolves(getUser);
    await chai.request(server.app)
      .post('/sign_in')
      .send({ ...signInUser, password: "wrong" })
      .then(({ status, body }) => {
        expect(status).to.be.eq(401);
        expect(body.message).to.be.eq("Wrong Password");
      });
  });
});
