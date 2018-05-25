//
// Boilerplate to setup express server
//
const express = require("express");
const app     = express();

app.get("/", defaultRoute);
app.get("/other", otherRoute);

app.listen(3000,
           () => console.log("Server running on port 3000"));

//
// Your code goes below here
//

/**
 * This is the method that handles the default route for this web
 * server. It can accept URL params named "q" and "u".
 *
 * From a client side, sample URL could look like:
 * http://localhost:3000/?q=monkey&u=maret
 */
function defaultRoute(request, response) {
  let query  = request.param("q");
  let user   = request.param("u");
  let result = `defaultRoute: Request from user "${user}", query is "${query}"`;
  console.log(result);
  response.send(result);
}

/**
 * This is the method that handles the other route for this web
 * server. It can accept URL params named "loc".
 *
 * From a client side, sample URL could look like:
 * http://localhost:3000/other/?loc=94301
 */
function otherRoute(request, response) {
  let loc = request.param("loc");
  switch(loc){
    case "94301": loc = "Palo Alto"; break;
    case "94040": loc = "Mountain View"; break;
  }
  
  let result = `otherRoute: Request with location "${loc}"`;
  console.log(result);
  response.send(result);
}

