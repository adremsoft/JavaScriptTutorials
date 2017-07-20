/**
 * Author: Boguslaw Gorczyca
 * Created: 2017-07-18
 *
 * No part of this file may be duplicated, revised, translated,
 * localized or modified in any manner or compiled, linked or
 * uploaded or downloaded to or from any computer system without
 * the prior written consent of AdRem Software sp z o.o.
 *
 * 2017 Copyright AdRem Software, all rights reserved
 */

'use strict';

const debug = require('debug');

// Classes

//  Basic class pattern

function BasicClass(id) {   // Class constructor
    const
        self = this, // Private field
        debugBasicClass = debug('Basic class');

    // Public field
    this.idMessagePrefix = 'Id:';

    //Private method
    function getIdMessage() {
        return `${self.idMessagePrefix} ${id}`;
    }

    // Public method
    this.showId = function() {
        debugBasicClass(getIdMessage());
    };

    debugBasicClass('Constructor executed');
}

// Factory method pattern

function FactoryMethod(instanceId) {
    const debugFactoryMethod = debug('Factory method');  // Private field

    //Private method
    function getIdMessage(messagePrefix) {
        return `${messagePrefix} ${instanceId}`;
    }

    debugFactoryMethod('Executed');
    return {
        // Public field
        idMessagePrefix: 'Id:',

        //Public method
        showId: function() {
            debugFactoryMethod(getIdMessage(this.idMessagePrefix));
        }
    };
}

// Class with prototype pattern

function getIdMessage(id) {
    return `Id: ${id}`;
}

function ClassWithPrototype(id) {
    this.debugClass = debug('Class with prototype');

    this.id = id;   //Public field

    this.debugClass('Constructor executed');
}

ClassWithPrototype.prototype.showId = function() {      // Public method
    this.debugClass(getIdMessage(this.id));
};

// Extension of ClassWithPrototype

function ClassExtension(id) {
    ClassWithPrototype.call(this, id);
    this.debugClass = debug('ClassExtension');
    this.debugClass('Constructor executed');
}

ClassExtension.prototype = Object.create(ClassWithPrototype.prototype);
ClassExtension.prototype.constructor = ClassExtension;

ClassExtension.prototype.checkExtension = function() {
    return 'Extension method';
};

// ES6 Class

class ES6Class {

    constructor(id) {
        this.debugES6Class = debug('ES6 Class');

        this.id = id;

        this.debugES6Class('Constructor executed');
    }

    showId() {
        this.debugES6Class(getIdMessage(this.id));
    }

}

class ES6ClassExtension extends ES6Class {

    constructor(id) {
        super(id);
        this.debugES6Class = debug('ES6 Class Extension');
        this.debugES6Class('Constructor executed');
    }

    checkExtension() {
        return 'ES6 extension method';
    }

}

/*
  Singleton pattern
 */

const singleton = (function () {
    const debugSingleton = debug('Debug singleton');

    function privateMethod() {
        return 'Hello from singleton';
    }

    // Definition of singleton
    return {
        publicMethod: function () {
            debugSingleton(privateMethod());
        },
        publicProperty: 'test'
    };

})();

module.exports = {
    BasicClass,
    FactoryMethod,
    ClassWithPrototype,
    ClassExtension,
    ES6Class,
    ES6ClassExtension,
    singleton
};
