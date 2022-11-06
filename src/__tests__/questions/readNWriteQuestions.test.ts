import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import server from '../../app';
import {
  questionMock,
  newQuestion,
  newQuestionsErrorMessages,
} from '../mocks/questionsMock';
import MongoModel from '../../database/models/MongoModel';
import Question from '../../database/models/Question';

chai.use(chaiHttp);
const { expect } = chai;

describe('Questions route tests', () => {
  beforeEach(() => {
    sinon.stub(Question, 'filterQuestions').resolves([questionMock]);
    sinon.stub(Question, 'readOne').resolves(questionMock);
    sinon.stub(Question, 'create').resolves(newQuestion);
    sinon.stub(Question, 'update').resolves(questionMock);
    sinon.stub(Question, 'delete').resolves();
  });

  afterEach(() => sinon.restore());

  it('Get all questions', async () => {
    await chai.request(server.app)
      .get('/questions')
      .then(({ status, body }) => {
        expect(status).to.be.eq(200);
        expect(body).to.be.an('array');
        expect(body).to.be.deep.eq([questionMock]);
      });
  });

  it('Get question by id', async () => {
    await chai.request(server.app)
      .get('/questions/6355da1a6036d69973750c01')
      .then(({ status, body }) => {
        expect(status).to.be.eq(200);
        expect(body).to.be.deep.eq(questionMock);
      });
  });

  it('Create question', async () => {
    await chai.request(server.app)
      .post('/questions')
      .send(newQuestion)
      .then(({ status, body }) => {
        expect(status).to.be.eq(201);
        expect(body).to.be.deep.eq(newQuestion);
      });
  });

  it('When invalid data for new questions', async () => {
    await chai.request(server.app)
      .post('/questions')
      .send({})
      .then(({ status, body }) => {
        expect(status).to.be.eq(400);
        body.message.map((err: string) => {
          expect(newQuestionsErrorMessages.includes(err)).to.be.true;
        });
      });
  });

  it('Update question status', async () => {
    await chai.request(server.app)
      .put('/questions/6355da1a6036d69973750c01')
      .send({ status: "published" })
      .then(({ status, body }) => {
        expect(status).to.be.eq(200);
        expect(body).to.be.an('object');
      });
  });

  it('Delete question', async () => {
    await chai.request(server.app)
      .delete('/questions/6355da1a6036d69973750c01')
      .then(({ status }) => {
        expect(status).to.be.eq(204);
      });
  });
});
