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
  let result = `[/test1]: Request from user "${user}", query is "${query}"`;
  console.log(result);
  response.send(result);
}

/**
 * This is the function that handles the "other" route for this web
 * server. It can accept URL params named "zip".
 *
 * From a client side, sample URL could look like:
 * http://localhost:3000/other/?zip=94301
 */
function test2Handler(request, response) {
  let zip = request.param("zip");
  switch (zip) {
    case "94301":
      zip = "Palo Alto";
      break;
    case "94040":
      zip = "Mountain View";
      break;
  }
  let result = `[/test2/]: Request with location "${zip}"`;
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
    console.log("processWeatherData() results:" + JSON.stringify(jsonData, null, 2));
  
    let result = {};
    
    if (!_.isNil(jsonData.main)) {
      let currentTempK = jsonData.main.temp;
      let currentTempF = (
                           (
                             currentTempK - 273.15
                           ) * 1.8
                         ) + 32;
      let currentTempC = currentTempK - 273.15;
      result           = {
        name        : jsonData.name,
        currentTempC: currentTempC,
        currentTempF: currentTempF,
      };
    }
    else {
      result = {
        probableCauseOfError: jsonData.message,
      };
    }
  
    console.log("[/weather]:" + JSON.stringify(result, null, 2));
    response.send(result);
  }
  
}