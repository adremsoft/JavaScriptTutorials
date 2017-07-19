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

const
    {BasicClass, FactoryMethod, ClassWithPrototype, ClassExtension,
     ES6Class, ES6ClassExtension, singleton} = require('./declarations'),
    debug = require('debug'),
    globalDebug = debug('Global debug:');

function useBasicClass() {
    globalDebug('Create BasicClass instance');
    const basicClassInstance = new BasicClass(1);
    globalDebug('Instance of BasicClass created');

    basicClassInstance.showId();
    basicClassInstance.idMessagePrefix = 'New id prefix: ';
    basicClassInstance.showId();
}

function useFactoryMethod() {
    globalDebug('Create instance by factory method');
    const instance = new FactoryMethod(2);
    globalDebug('Instance created');

    instance.showId();
    instance.idMessagePrefix = 'New id prefix: ';
    instance.showId();
}

function useClassWithPrototype() {
    globalDebug('Create ClassWithPrototype instance');
    const instanceWithPrototype = new ClassWithPrototype(3);
    globalDebug('Instance of ClassWithPrototype created');

    instanceWithPrototype.showId();
    globalDebug(`Instance of ClassWithPrototype: ${(instanceWithPrototype instanceof ClassWithPrototype)}`);
    globalDebug(`Instance of ClassExtension: ${(instanceWithPrototype instanceof ClassExtension)}`);
}

function useClassExtension() {
    globalDebug('Create ClassExtension instance');
    const instanceOfClassExtension = new ClassExtension(4);
    globalDebug('Instance of ClassExtension created');

    instanceOfClassExtension.showId();
    globalDebug(instanceOfClassExtension.checkExtension());
    globalDebug(`Instance of ClassWithPrototype: ${(instanceOfClassExtension instanceof ClassWithPrototype)}`);
    globalDebug(`Instance of ClassExtension: ${(instanceOfClassExtension instanceof ClassExtension)}`);
}

function useES6Class() {
    globalDebug('Create ES6Class instance');
    const instanceOfES6Class = new ES6Class(5);
    globalDebug('Instance of ES6Class created');

    instanceOfES6Class.showId();
    globalDebug(`Instance of ES6Class: ${(instanceOfES6Class instanceof ES6Class)}`);
    globalDebug(`Instance of ES6ClassExtension: ${(instanceOfES6Class instanceof ES6ClassExtension)}`);
}

function useES6ClassExtension() {
    globalDebug('Create ES6ClassExtension instance');
    const instanceOfES6ClassExtension = new ES6ClassExtension(6);
    globalDebug('Instance of ES6ClassExtension created');

    instanceOfES6ClassExtension.showId();
    globalDebug(instanceOfES6ClassExtension.checkExtension());
    globalDebug(`Instance of ES6Class: ${(instanceOfES6ClassExtension instanceof ES6Class)}`);
    globalDebug(`Instance of ES6ClassExtension: ${(instanceOfES6ClassExtension instanceof ES6ClassExtension)}`);
}

function useSingleton() {
    globalDebug('Using singleton');
    singleton.publicMethod();
    globalDebug(singleton.publicProperty);
}

useBasicClass();
useFactoryMethod();
useClassWithPrototype();
useClassExtension();
useES6Class();
useES6ClassExtension();
useSingleton();

/* Exercise

    We have given specification of interface as follow:

    const INTERFACE = {
        'name?': 'string',
        'state': 'boolean',
        'value': 'number',
        'elementName': 'ElementClass'
        'variant': 'any',
        'methodName': 'method'
    }

    which is similar to TypeScript interface declaration.
    Write a function which check if instance implements given interface:

    implements(instance, interfaceDefinition) => true | false

    Use among other follow operations:
      * Object.getOwnPropertyNames
      * typeof
      * instanceof
      * Object.getPrototypeOf

    Sample:

        const INSTANCE_INTERFACE = {
            'name?': 'string',
            'state': 'boolean',
            'value': 'number',
            'element': 'ES6Class'
            'variant': 'any',
            'showId': 'method'
        }

        class SampleInstance extends ClassWithPrototype {

          constructor() {
            this.name = 'sample instance',
            this.state = false,
            this.value = 0,
            this.variant = 'variant value',
            this.element: new ES6Class(2);
          }

        }

        implements(new SampleInstance(), INSTANCE_INTERFACE) ---> true;

 */
