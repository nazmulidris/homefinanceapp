/*
 * Copyright 2018 Nazmul Idris. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//
// Boilerplate to setup express server
//

const express = require("express");
const app     = express();
const port    = process.env.PORT || 3000;

// Get the web server to serve up static HTML content
app.use('/', express.static('static'));

// Setup web service end points (that map paths to functions)
app.get("/test1", test1Handler);
app.get("/test2", test2Handler);
app.get("/weather", weatherHandler);

app.listen(port,
           () => console.log(`Server running on port ${port}`));

//
// Your code goes below here
//

/**
 * This is the function that handles the "default" route for this web
 * server. It can accept URL params named "q" and "u".
 *
 * From a client side, sample URL could look like:
 * http://localhost:3000/?q=monkey&u=maret
 */
function test1Handler(request, response) {
  let query  = request.param("q");
  let user   = request.param("u");
  let result = `[/]: Request from user "${user}", query is "${query}"`;
  console.log(result);
  response.send(result);
}

/**
 * This is the function that handles the "other" route for this web
 * server. It can accept URL params named "loc".
 *
 * From a client side, sample URL could look like:
 * http://localhost:3000/other/?loc=94301
 */
function test2Handler(request, response) {
  let loc = request.param("loc");
  switch (loc) {
    case "94301":
      loc = "Palo Alto";
      break;
    case "94040":
      loc = "Mountain View";
      break;
  }
  let result = `[/other/]: Request with location "${loc}"`;
  console.log(result);
  response.send(result);
}

/**
 * This is the function that handles the "weather" route for this web
 * server. It can accept URL params named "zip".
 *
 * Here's an example of a real weather API:
 * https://openweathermap.org/current
 *
 * From a client side, sample URL could look like:
 * http://localhost:3000/weather/?zip=94301
 */
function weatherHandler(request, response) {
  let zip = request.query.zip || '94301';
  let key = "92ea5b462169ff227167a603039d404e";
  let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`;
  
  let fetch = require('node-fetch');
  let _     = require('lodash');
  
  fetch(url)
    .then(response => response.json())
    .then(processWeatherData);
  
  function processWeatherData(jsonData) {
    console.log(jsonData);
    
    if (!_.isNil(jsonData.main)) {
      let currentTempK = jsonData.main.temp;
      let currentTempF = (
                           (
                             currentTempK - 273.15
                           ) * 1.8
                         ) + 32;
      let currentTempC = currentTempK - 273.15;
      let result       = {
        name        : jsonData.name,
        currentTempC: currentTempC,
        currentTempF: currentTempF,
      };
      response.send(result);
    }
    else {
      let result = {
        name                : "unknown",
        currentTempC        : "unknown",
        currentTempF        : "unknown",
        probableCauseOfError: jsonData.message,
      };
      response.send(result);
    }
  }
  
}