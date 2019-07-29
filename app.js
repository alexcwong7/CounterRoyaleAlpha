/*var express = require("express");
var app = express();
var request = require("request");

const fs = require('fs');
const https = require('https');

const httpsOptions = {
  cert: fs.readFileSync('./ssl/counterroyale_com.crt'),
  ca: fs.readFileSync('./ssl/counterroyale_com.ca-bundle'),
  key: fs.readFileSync('./ssl/counterroyale_com.p7b')
};

const httpsServer = https.createServer(httpsOptions, app);

// Routing
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // API Request
  var options = {
      method: 'GET',
      url: 'https://api.royaleapi.com/clan/20PVP80',
      headers: {
          auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcwMSwiaWRlbiI6IjE3ODQ0MTkxMjQxMDE3NzUzNyIsIm1kIjp7InVzZXJuYW1lIjoiRmFuY3lOYW1lIiwia2V5VmVyc2lvbiI6MywiZGlzY3JpbWluYXRvciI6IjI1NjgifSwidHMiOjE1NjQyNTU2ODQyNTJ9.VkWIPXQxdSnEdFinB27P8IIThAKnFPH22vN1O2Z14Pk'
      }
  };

  request(options, (error, response, body) => {
      if(!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          //console.log(data);
          res.render("index.ejs");
      }
  });

});


// app.listen(process.env.PORT || 3000, () => {
//   console.log("Server is running");
// });

httpsServer.listen(443, 'counterroyale.com');

*/

const fs = require("fs");
const https = require('https');

const hostname = 'counterroyale.com';
const port = 443;

const httpsOptions = {
  cert: fs.readFileSync('./ssl/counterroyale_com.crt'),
  ca: fs.readFileSync('./ssl/counterroyale_com.ca-bundle'),
  key: fs.readFileSync('./ssl/server.key')
};

const httpsServer = https.createServer(httpsOptions, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello from the HTTPS server</h1>');
});

httpsServer.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
