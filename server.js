// import Wad from "web-audio-daw";

const express = require("express");
const httpServer = require("http");
const bodyParser = require("body-parser");
// const wad = require("web-audio-daw");

var app = express();
var http = httpServer.createServer(app);

// Initialize site files
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve main page
app.get('/', function(req, res) { res.sendFile(__dirname + "/index.html"); });

http.listen(3000, function() {
  console.log("\x1b[32mServer running on localhost:3000");
  console.log("\x1b[33mPress CTRL + C to shut down\x1b[0m");
});