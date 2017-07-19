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
    debug = require('debug');

// Functions

function functions() {
    const
        firstFunctionDebug = debug('First function'),
        fifthFunctionDebug = debug('Fifth function');

    function firstFunction() {
        return 'Sample return value of first function';
    }

    function secondFunction(arg1, arg2) {
        const secondFunctionDebug = debug('Second function');

        secondFunctionDebug(`Function has named arguments: '${arg1}' '${arg2}'`);
        secondFunctionDebug('Function has arguments object:');
        secondFunctionDebug(arguments);
    }

    function thirdFunction(...args) {
        const thirdFunctionDebug = debug('Third function');

        thirdFunctionDebug('Function has unnamed arguments: ');
        thirdFunctionDebug(args);
    }

    function fourthFunction(func) {
        const fourthFunctionDebug = debug('Fourth function');

        fourthFunctionDebug('Function may by passed as argument to another function');
        fourthFunctionDebug(`Result of execution of passed function: ${func()}`);
    }

    function fifthFunction(firstFactor) {

        /* Function multiply is created inside function fifthFunction.
           During creation of multiply closure for this function is saved and contains value of firstFactor.
           Value of firstFactor will be available inside multiply for all the time its existence.

           Additional information about closures:
           https://developer.mozilla.org/en/docs/Web/JavaScript/Closures
         */
        function multiply(secondFactor) {
            return firstFactor * secondFactor;
        }

        return multiply;                    // Created function is returned and may be executed later
    }

    // Function as object
    firstFunctionDebug('Function has a content:');
    firstFunctionDebug(firstFunction.toString());
    firstFunctionDebug(`Function has a name: ${firstFunction.name}`);

    firstFunction.sampleProperty = 'Some additional function metadata';
    firstFunctionDebug(`Function is an object and may have properties: ${firstFunction.sampleProperty}`);

    // Function execution
    firstFunctionDebug(`Function returns value: ${firstFunction()}`);

    secondFunction('first arg');
    secondFunction('first arg', 'second arg');
    secondFunction('first arg', 'second arg', 'third arg');
    thirdFunction(1, 2, 4, 5);
    fourthFunction(firstFunction);

    const multiplyBy12 = fifthFunction(12); // Function which multiply by 12 is returned
    fifthFunctionDebug('Function may create and return another function');
    fifthFunctionDebug(`Result of execute of returned multiplier function 12 x 2: ${multiplyBy12(2)}`);

}

functions();
