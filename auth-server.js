const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8081
const bodyParser = require('body-parser')
const axios = require("axios")
const rp = require("request-promise")
// const history = require('connect-history-api-fallback');

app.use(bodyParser.json())
app.use(cors())
// app.use(history())
// app.use( express.static( __dirname + '/dist/'));
var body
app.get('/createRefreshToken', (req, res) => {
  console.log('Here', req.query)
  getRefrehToken(req.query.code).then (response => {
    console.log('RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', response)
    res.send({
      result: response
    }) 
  })
});

app.get('/getNewAccessToken', (req, res) => {
  console.log('Here', req.query)
  getNewAccessToken(req.query.refreshToken).then (response => {
    console.log('RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', response)
    res.send({
      result: response
    }) 
  })
});

app.get('/revokeRefreshToken', (req, res) => {
  console.log('Here', req.query)
  revokeRefreshToken(req.query.refreshToken).then (response => {
    console.log('RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', response)
    res.send({
      result: response
    }) 
  })
});

app.listen(port, () => console.log(`server started`));

async function getRefrehToken (code) {

  const options = { 
    method: 'POST',
    url: 'https://test-accreditly.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: { 
      grant_type: 'authorization_code',
      client_id: 'ng1cDuer1VzeaSb01NNQzNZOIcEgFK2O',
      client_secret: 'DAceJJt064l1yy5-xf3vObK2Ob0rbnUWdhlGRaLOwgX2jNxNAwt6yyK8slKdWF6C',
      code: code,
      redirect_uri: 'http://localhost:8080/#/'
    },
    json: true
  };

  try {
    const response = await rp(options);
    console.log('BODYYYYYYYYYYYYYYYYYYYYYYYYY', response)
    return response
    // console.log(data);
  } catch (error) {
    console.log('error', error.response.body);
    return error.response.body
  }
}

async function getNewAccessToken (refreshToken) {
  let options = { 
    method: 'POST',
    url: 'https://test-accreditly.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: 
    { grant_type: 'refresh_token',
      client_id: 'ng1cDuer1VzeaSb01NNQzNZOIcEgFK2O',
      client_secret: 'DAceJJt064l1yy5-xf3vObK2Ob0rbnUWdhlGRaLOwgX2jNxNAwt6yyK8slKdWF6C',
      refresh_token: refreshToken
    },
    json: true
  };

  try {
    const response = await rp(options);
    console.log('BODYYYYYYYYYYYYYYYYYYYYYYYYY', response)
    return response
  } catch (error) {
    console.log('error', error.response.body);
    return error.response.body
  }
}

async function revokeRefreshToken (refreshToken) {
  let options = { 
    method: 'POST',
    url: 'https://test-accreditly.eu.auth0.com/oauth/revoke',
    headers: { 'content-type': 'application/json' },
    body: {
      client_id: 'ng1cDuer1VzeaSb01NNQzNZOIcEgFK2O',
      client_secret: 'DAceJJt064l1yy5-xf3vObK2Ob0rbnUWdhlGRaLOwgX2jNxNAwt6yyK8slKdWF6C',
      token: refreshToken
    },
    json: true
  };

  try {
    const response = await rp(options);
    console.log('BODYYYYYYYYYYYYYYYYYYYYYYYYY', response)
    return response
  } catch (error) {
    console.log('error', error.response.body);
    return error.response.body
  }
}