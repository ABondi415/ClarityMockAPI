'use strict';

describe('Router', () => {
  const express = require('express');
  const supertest = require('supertest');

  let request;

  beforeEach(() => {
    let app = express();
    app.use((data, request, response, next) => {
      let httpResponseCode = data.Error ? 500 : 200;
      response.writeHead(httpResponseCode, { 'Content-Type': 'application/json' });
    
      let responseString = JSON.stringify(data);
      response.end(responseString);
    });

    let api = require('../routes/api');
    app.use('/api', api);
    request = supertest(app);
  });

  it('should GET /healthCheck', (done) => {
    request
      .get('/api/healthCheck')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err)
          return done(err);
        
        done();
      })
  });
});