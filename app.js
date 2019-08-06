const express = require("express");
const app = express();
const request = require("request");

// SSL certificate stuff
const fs = require('fs');
const http = require('http');
const https = require('https');

const hostname = 'counterroyale.com';
const httpPort = 80;
const httpsPort = 443;
const httpsOptions = {
  cert: fs.readFileSync('./ssl/counterroyale_com.crt'),
  ca: fs.readFileSync('./ssl/counterroyale_com.ca-bundle'),
  key: fs.readFileSync('./ssl/server.key')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

// REDIRECT to secure protocol (UNCOMMENT WHEN PUBLISHING!)
app.use((req, res, next) => {
	if(req.protocol === 'http') {
		res.redirect(301, `https://${req.headers.host}${req.url}`);
	}
	next();
});

// Routing
app.use(express.static("public"));
//app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // API Request
  var options = {
      method: 'GET',
      url: 'https://v3-beta.royaleapi.com/constants',
      headers: {
          auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcwMSwiaWRlbiI6IjE3ODQ0MTkxMjQxMDE3NzUzNyIsIm1kIjp7InVzZXJuYW1lIjoiRmFuY3lOYW1lIiwia2V5VmVyc2lvbiI6MywiZGlzY3JpbWluYXRvciI6IjI1NjgifSwidHMiOjE1NjQyNTU2ODQyNTJ9.VkWIPXQxdSnEdFinB27P8IIThAKnFPH22vN1O2Z14Pk'
      }
  };

  request(options, (error, response, body) => {
      if(!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          res.render("index.ejs", {data:data.cards});
      }
  });
});

app.get("/decks", (req, res) => {

  res.render("decks.ejs");
});

app.get("/players", (req, res) => {
  var query = req.query.tag;
  if(query === undefined) {
    res.render("players.ejs");
  }
  else {
    //query = query.split('#').join("").toUpperCase();
    var options = {
        method: 'GET',
        url: 'https://v3-beta.royaleapi.com/player/'+query,
        headers: {
            auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcwMSwiaWRlbiI6IjE3ODQ0MTkxMjQxMDE3NzUzNyIsIm1kIjp7InVzZXJuYW1lIjoiRmFuY3lOYW1lIiwia2V5VmVyc2lvbiI6MywiZGlzY3JpbWluYXRvciI6IjI1NjgifSwidHMiOjE1NjQyNTU2ODQyNTJ9.VkWIPXQxdSnEdFinB27P8IIThAKnFPH22vN1O2Z14Pk'
        }
    };

    request(options, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("players.ejs", {data: data});
        }
        else {
          res.send("Player not found!");
        }
    });
  }
});

/*app.get("/playersearch", (req, res) => {
  var query = req.query.search;
  if(typeof query === undefined) {
    console.log('undefined playersearch');
    res.render("players.ejs");
  }
  else {
    console.log(query);

    res.redirect("/players/" + query);
  }
});*/

app.get("/players/:query", (req, res) => {
  //var query = req.query.search;
  var query = req.params.query;
  console.log("my query!!" +query);
  var url = "https://v3-beta.royaleapi.com/player/" + query;
  console.log("/players/*");
  request(url, (error, response, body) => {
      if(!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          console.log(data["name"]);
          res.render("players.ejs", {data: data});
      }
      else {
        res.send("Player not found!");
      }
  });
  //res.render("players.ejs");
});

// Start server GLOBALLY (UNCOMMENT WHEN PUBLISHING!)
httpServer.listen(httpPort, hostname);
httpsServer.listen(httpsPort, hostname);

// Start server LOCALLY
//app.listen(process.env.PORT || 3000, () => {
//  console.log("Server is running");
//});
