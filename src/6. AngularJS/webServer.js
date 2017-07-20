/**
 * Author: Boguslaw Gorczyca
 * Created: 2017-07-20
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
    debug = require('debug'),
    express = require('express'),
    webServer = express(),
    webServerDebug = debug('Web server: '),

    SERVER_PORT = 4000;

webServer.use('/', express.static(`${__dirname}/public`));

webServer.listen(SERVER_PORT, () => {
    webServerDebug('Started');
});
