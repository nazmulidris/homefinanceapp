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

function getWeather() {
    let zip = document.querySelector('#zip').value;
    console.log(zip);

    let url = `/weather/?zip=${zip}`;
    console.log(url);

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

/**
 * Note - zip code of 94750 produces an error (in which case
 * data.probableCauseOfError is defined and contains a string).
 * In situations where the zip code is valid, this field is
 * undefined.
 */
function displayWeather(data) {
    let {name, currentTempC, currentTempF, probableCauseOfError} = data;

    let message = `Weather data:
        name=${name}, 
        C=${currentTempC}, 
        F=${currentTempF}, 
        err=${przobableCauseOfError}`;

    console.log(message);

    let div = document.createElement("DIV");
    div.setAttribute('id', 'temp');
    div.textContent = message;
    let existingElementToReplace = document.querySelector('#temp');
    existingElementToReplace.replaceWith(div);

}