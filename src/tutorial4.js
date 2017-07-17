/**
 * Author: Boguslaw Gorczyca
 * Created: 2017-07-17
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
    util = require('util'),
    debug = require('debug');

/*
  Async task emulator
  Error first callback
  http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/
*/

function asyncTaskCallback(options, callback) {
    const
        DEFAULTS = {
            name: 'Task',
            maxDuration: 1000,
            failureProbability: 0
        },
        parameters = Object.assign(DEFAULTS, options),
        timeout = parameters.timeout || Math.round(Math.random() * parameters.maxDuration),
        taskSuccess = (parameters.failureProbability <= Math.random()),
        taskDebug = debug(`Task ${parameters.name}`);

    taskDebug('Start execution');
    setTimeout(() => {
        if (taskSuccess) {
            taskDebug('Successful');
            callback(null, `Result of task: ${parameters.name}`);
        } else {
            taskDebug('Error');
            callback(new Error(`Task ${parameters.name} error`));
        }
    }, timeout);

}

/*
  Event loop
  1. http://latentflip.com/loupe/
  2. https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
  3. http://voidcanvas.com/setimmediate-vs-nexttick-vs-settimeout/
*/

function parallelProcessingOfCallbackTasks() {

    function task(name) {
        const taskDebug = debug(`Task ${name}`);

        asyncTaskCallback({name, failureProbability: 0.1},(err, result) => {
            if (err) {
                taskDebug(err);
            } else {
                taskDebug(result);
            }
        });
    }

    task(1);
    task(2);
    task(3);
    task(4);
    task(5);
    task(6);
    task(7);
    task(8);
    task(9);
    task(10);

    /*
      It is difficult to signalize when all tasks are finished and get all results
      For example we want perform simultaneous 10 REST api request and combine their results
    */
}

function sequenceOfCallbackTasks() {

    function task(name, callback) {
        const taskDebug = debug(`Task ${name}`);

        asyncTaskCallback({name, failureProbability: 0.1},(err, result) => {
            if (err) {
                taskDebug(err);
                callback(err);
            } else {
                taskDebug(result);
                callback(null, result);
            }
        });
    }

    /*
        When we need perform sequential set of asynchronous tasks our code is transformed into callback hell.
        Combining parallel and sequential execution intensifies the problem.
     */
    task(1, (err) => {
        if (err == null) {
            task(2, () => {
                if (err == null) {
                    task(3, () => {
                        if (err == null) {
                            task(4, () => {
                            });
                        }
                    });
                }
            });
        }
    });

}

/*
  Promise adapter for callback interface
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/

function asyncTaskPromise(options) {
    return new Promise((resolve, reject) => {
        asyncTaskCallback(options, (err, result) => {
            if (err == null) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
}

function parallelProcessingOfPromiseTasks(failureProbability = 0) {
    const parallelTasksDebug = debug('Parallel tasks');

    function task(name) {
        return asyncTaskPromise({name, failureProbability});
    }

    const
        taskIds = Array.from({length: 10}, (value, index) => index + 1),
        taskPromises = taskIds.map(taskId => task(taskId));

    return Promise.all(taskPromises)
        .then(result => {
            parallelTasksDebug('Success');
            parallelTasksDebug(result);
        })
        .catch(error => parallelTasksDebug(error));
}

function sequenceOfPromiseTasks(failureProbability = 0) {
    const sequenceTasksDebug = debug('Sequence tasks: ');

    function task(name) {
        return asyncTaskPromise({name, failureProbability});
    }

    return task(1)
        .then(() => task(2))
        .then(() => task(3))
        .then(() => sequenceTasksDebug('Completed'))
        .catch(error => sequenceTasksDebug(error));
}

function automaticSequenceOfPromiseTasks(numberOfTasks = 10, failureProbability = 0) {
    const taskIds = Array.from({length: numberOfTasks}, (value, index) => index + 1);

    function task (name) {
        return asyncTaskPromise({ name, failureProbability });
    }

    return taskIds.reduce((promisesChain, taskId) => {
        return promisesChain
            .then(taskResults => {
                return task(taskId).
                    then(result => {
                        taskResults.push(result);
                        return taskResults;
                });
            });
    }, Promise.resolve([]));

}

/*
  Asynchronous tasks execution
 */

/*
asyncTaskCallback({name: 1}, (err, result) => {
    const taskDebug = debug('Task 1');

    if (err == null) {
        taskDebug(result);
    } else {
        taskDebug(err);
    }

});
*/

/*
asyncTaskCallback({name: 2, failureProbability: 0.75}, (err, result) => {
    const taskDebug = debug('Task 2');

    if (err == null) {
        taskDebug(result);
    } else {
        taskDebug(err);
    }

});
*/

/*
parallelProcessingOfCallbackTasks();
*/

/*
sequenceOfCallbackTasks();
*/

/*
asyncTaskPromise({name: 1})
    .then(result => {
        const taskDebug = debug('Task 1');
        taskDebug(result);
    })
    .catch(error => {
        const taskDebug = debug('Task 1');
        taskDebug(error);
    });
*/

/*
asyncTaskPromise({name: 2, failureProbability: 0.75})
    .then(result => {
        const taskDebug = debug('Task 2');
        taskDebug(result);
    })
    .catch(error => {
        const taskDebug = debug('Task 2');
        taskDebug(error);
    });
*/

// parallelProcessingOfPromiseTasks(0);

// sequenceOfPromiseTasks(0);

automaticSequenceOfPromiseTasks(5, 0)
    .then(result => {
        const taskDebug = debug('Automatic sequence');
        taskDebug('Result');
        taskDebug(result);
    })
    .catch(error => {
        const taskDebug = debug('Automatic sequence');
        taskDebug(error);
    });
