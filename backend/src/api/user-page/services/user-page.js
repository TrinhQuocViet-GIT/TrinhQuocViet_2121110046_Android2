'use strict';

/**
 * user-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-page.user-page');
