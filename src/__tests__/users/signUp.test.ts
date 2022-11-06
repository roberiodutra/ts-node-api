import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import server from '../../app';
import User from '../../database/models/User';
import {
  newUser,
  signUpUser,
  newSign,
  wrongSignUpUser,
  signUpErrorMessages,
} from '../mocks/usersMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Sign up route tests', () => {
  beforeEach(() => {
    sinon.stub(User, 'create').resolves(newUser);
  });

  afterEach(() => sinon.restore());

  it('On success', async () => {
    sinon.stub(User, 'readByEmail').resolves();
    await chai.request(server.app)
      .post('/sign_up')
      .send(signUpUser)
      .then(({ status, body }) => {
        expect(status).to.be.eq(201);
        expect(body).to.haveOwnProperty("token");
        expect(body).to.be.deep.eq({ ...newSign, token: body.token });
      });
  });

  it('When user exists', async () => {
    sinon.stub(User, 'readByEmail').resolves(newUser);
    await chai.request(server.app)
      .post('/sign_up')
      .send(signUpUser)
      .then(({ status, body }) => {
        expect(status).to.be.eq(409);
        expect(body.message).to.be.eq("User Already Exists");
      });
  });

  it('When invalid data', async () => {
    sinon.stub(User, 'readByEmail').resolves();
    await chai.request(server.app)
      .post('/sign_up')
      .send(wrongSignUpUser)
      .then(({ status, body }) => {
        expect(status).to.be.eq(400);
        body.message.map((err: string) => {
          expect(signUpErrorMessages.includes(err)).to.be.true;
        });
      });
  });
});
