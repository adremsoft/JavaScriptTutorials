/**
 * Author: Boguslaw Gorczyca
 * Created: 2017-07-13
 *
 * No part of this file may be duplicated, revised, translated,
 * localized or modified in any manner or compiled, linked or
 * uploaded or downloaded to or from any computer system without
 * the prior written consent of AdRem Software sp z o.o.
 *
 * 2017 Copyright AdRem Software, all rights reserved
 */

'use strict';

const
    fs = require('fs'),
    path = require('path'),
    debug = require('debug'),

    DATA_FOLDER = '../../data/',
    TEXT_FILE = 'textFile.txt';

function readFile(fileName) {
    if (fileName != null) {
        const filePath = path.join(__dirname, `${DATA_FOLDER}${fileName}`);
        return fs.readFileSync(filePath, {encoding: 'utf8'});
    }
    return '';
}

// Arrays
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype

function arrays() {
    const
        debugArray = debug('Array'),
        sampleArray = ['first element'];
    let element;

    debugArray(`Array has a length: ${sampleArray.length}`);
    debugArray('Array may contain element of different types');

    sampleArray.push(2);
    sampleArray.push({ name: 'value'});
    sampleArray.push(true);
    sampleArray.push(5);
    debugArray(sampleArray);

    element = sampleArray.pop();
    debugArray(`Pop array element: ${element}`);
    debugArray(sampleArray);

    element = sampleArray.shift();
    debugArray(`Shift array element: ${element}`);
    debugArray(sampleArray);

    debugArray('Array is an object an may have properties');
    debugArray('Properties are not a elements of array');
    debugArray(`Array length: ${sampleArray.length}`);
    sampleArray.description = 'My sample array description';
    debugArray(sampleArray);
    debugArray(`Array property: ${sampleArray.description}`);
    debugArray(`Array length: ${sampleArray.length}`);

}

/*
  Functional approach to processing arrays and objects.
  Function forEach, map, filter, some, every, reduce are very helpful.
 */

function functionalProcessing() {
    const textFileContent = readFile(TEXT_FILE);            // Read text file into string variable

    function calculateLetterStatistics(content) {
        const letterRegExp = new RegExp('[a-z]', 'i');      // Regular expression which check if something is letter

        function checkCharIsLetter(char) {                  // Function which return true is char is a letter
            return char.match(letterRegExp);
        }

        // Functional processing of array. Result is an object.
        return content                                      // Create a object with letter statistic
            .split('')                                      // Convert a string to an array of chars
            .filter(checkCharIsLetter)                      // Remove chars which are not a letters
            .map(function(letter){                          // Convert all letter to uppercase
                return letter.toUpperCase();
            })
            .reduce((statistics, letter) => {               // Add a letter to statistics
                if (statistics[letter] == null) {           // If statistics has not got entry for letter
                    statistics[letter] = 1;                 // Define entry
                } else {                                    // If statistics has got entry for letter
                    statistics[letter] += 1;                // Update entry
                }
                return statistics;
            }, {});

    }

    function showStatisticsAlphabetically(register) {
        const statisticsAlphabetically = debug('Alphabetically');

        // Functional processing of object
        Object.keys(register)
            .sort()
            .forEach(letter => {
                statisticsAlphabetically(`${letter}: ${register[letter]}`);
            });
    }

    function showStatisticsDescending(register) {
        const statisticsAscending = debug('Descending');

        // Functional processing of object
        Object.entries(register)
            .sort((entry1, entry2) => (entry2[1] - entry1[1]))
            .forEach(entry => statisticsAscending(`${entry[0]}: ${entry[1]}`));
    }

    const statistics = calculateLetterStatistics(textFileContent);
    showStatisticsAlphabetically(statistics);
    showStatisticsDescending(statistics);
}

arrays();
functionalProcessing();

/* Exercises:

  1. Write a function that will add all its parameters.
     The number of parameters is not specified. Parameters are a numeric values.

     addValues(2, 3, 4.5);

  2. Write a function that will multiply all its parameters.
     The number of parameters is not specified. Parameters are numeric values.

     multiplyValues(2, 3, 4.5);

  3. Write a function that get two arguments: array and function and executes that function with parameters
     passed in array.

     performTask(func, parameters);
     performTask(addValues, [1, 2, 3, 4]) => return 10
     performTask(multiplyValues, [1, 2, 3, 4]) => return 24

  4. Write a function which read integers from file and find primes.
     Sample files:
        /data/integers1.txt
        /data/integers2.txt

     Apply Sieve of Eratosthenes algorithm and and solve the problem by functional approach.
     https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

 */
