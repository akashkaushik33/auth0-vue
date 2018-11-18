// script to get managemant authentication token
var request = require("request");

var options = { method: 'POST',
  url: 'https://vue-passwordless.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: 
   { grant_type: 'client_credentials',
     client_id: 'dW6ch2aEHKTACnaqQ12Lx2OSmKgb8McV',
     client_secret: 'neq1ulm_eHZfPowQOwi916KnzI2UTaQUE1ahhCUN28CMICEsSS6BvWJXqYjnQv1d',
     audience: 'https://vue-passwordless.auth0.com/api/v2/',
       
    },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log("RESSSSSSSSSSSSSSSSSSSSSS", response)
  console.log("BODYYYYYYYYYYYYYYYYYYYYY", body)

  // console.log(body);
});