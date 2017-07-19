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

// Node API
// https://nodejs.org/dist/latest-v8.x/docs/api/

'use strict';

/*
  Why strict mode 'use strict' is so important !
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

const
    debug = require('debug');

/*
  Clean code javascript
  https://github.com/airbnb/javascript
  https://github.com/ryanmcdermott/clean-code-javascript
*/

// JavaScript Primitives

function jsPrimitives() {

    function boolean() {
        const
            booleanDebug = debug('Boolean'),
            boolean = true;

        booleanDebug(`Boolean has value: ${boolean}`);
        booleanDebug(`(Boolean == 1) ${boolean == 1}`);              // jshint ignore: line
        booleanDebug(`(Boolean === 1) ${boolean === 1}`);
        booleanDebug(`(Boolean === true) ${boolean === true}`);
    }

    function number() {
        const
            numberDebug = debug('Number'),
            number = 22.3;

        //https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Number/prototype

        numberDebug(`Number has value has value: ${number}`);
        numberDebug(`(Number == '11.2') ${number == '22.3'}`);      // jshint ignore: line
        numberDebug(`(Number === '11.2') ${number === '22.3'}`);
        numberDebug(`(Number === 11.2) ${number === 22.3}`);
        numberDebug(`(Is number integer) ${Number.isInteger(number)}`);
    }

    function string() {
        const
            stringDebug = debug('String'),
            string = 'Sample text';

        // https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/String/prototype

        stringDebug(`String has value: ${string}`);
        stringDebug(`Replace 'text' to 'string': ${string.replace('text', 'string')}`);
        stringDebug(`Index of 'ple': ${string.indexOf('ple')}`);
        stringDebug('Split string on whitespace:');
        stringDebug(string.split(/\s/));

    }

    function nullAndUndefined() {
        const
            nullAndUndefinedDebug = debug('Null and undefined'),
            nullValue = null;
        let undefinedValue;                                      // Value that has not been specified
                                                                 // Variables have 'undefined' value by default

        nullAndUndefinedDebug(`Null value has value: ${nullValue}`);
        nullAndUndefinedDebug(`Undefined value has value: ${undefinedValue}`);
        nullAndUndefinedDebug(`(NullValue == null) ${nullValue == null}`);                // jshint ignore: line
        nullAndUndefinedDebug(`(UndefinedValue == null) ${undefinedValue == null}`);      // jshint ignore: line
        nullAndUndefinedDebug(`(NullValue === undefined) ${nullValue == undefined}`);     // jshint ignore: line
        nullAndUndefinedDebug(`(UndefinedValue === null) ${undefinedValue == null}`);     // jshint ignore: line
    }

    function literalObject() {
        const
            objectDebug = debug('Object'),
            literalObject = {
                propertyName: 'propertyValue',                          // String value
                abc: 23,                                                // Number value
                'string property name': 45,                             // String property name
                object: {                                               // Object value
                    name: 'property value'
                }
            };

        // https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Object/prototype
        objectDebug('Literal object has properties:');
        objectDebug(Object.keys(literalObject));
        objectDebug('Literal object has entries:');
        objectDebug(Object.entries(literalObject));

        objectDebug('Access to property value:');
        objectDebug(`Value of property abc: ${literalObject.abc}`);
        objectDebug(`Value of  property 'string property name': ${literalObject['string property name']}`);
    }

    boolean();
    number();
    string();
    nullAndUndefined();
    literalObject();
}

jsPrimitives();
