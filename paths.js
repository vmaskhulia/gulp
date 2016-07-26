'use strict';

import path from 'path';


var root = `${path.dirname(__dirname)}`;

var paths = {
  root,

  config: {
    karma: `${root}/karma.conf.js`,
    e2e: `${root}/protractor.conf.js`,
    jspm: `${root}/jspm.conf.js`
  },

  jshintrc: `${root}/.jshintrc`,

  gulpfiles: [`${root}/gulpfile.js`, `${root}/gulp/**/*.js`],

  generatorTemplates: {
    directive: `${root}/gulp/generator/directive/**`,
    modal: `${root}/gulp/generator/modal/**`,
    service: `${root}/gulp/generator/service/**`,
    resource: `${root}/gulp/generator/resource/**`,
    validator: `${root}/gulp/generator/validator/**`,
    mainComponent: `${root}/gulp/generator/main-component/**`,
    adminComponent: `${root}/gulp/generator/admin-component/**`,
    api: `${root}/gulp/generator/api/**`,
    stub: `${root}/gulp/generator/stub/**`
  },

  server: {
    base: `${root}/server`,
    starter: 'server/server.js',
    scripts: `${root}/server/**/*.js`,
    specs: `${root}/server/**/*.spec.js`
  },

  app: {
    indexHtml: `${root}/client/index.html`,
    styles: `${root}/client/app/**/*.styl`,
    scripts: `${root}/client/app/**/*.js`,
    templates: `${root}/client/app/**/*.html`,
    assets: `${root}/client/{assets/**/*,.htaccess,robots.txt,favicon.ico,zohoverify/*}`,
    common: `${root}/client/app/common`,
    components: `${root}/client/app/components`
  },

  test: {
    e2e: `${root}/client/test/e2e/**/*.js`,
    unit: `${root}/client/test/unit/**/*.js`
  },

  tmp: {
    base: `${root}/.tmp`,
    starter: `${root}/.tmp/app/app.js`
  },

  dist: {
    base: `${root}/dist`,
    indexHtml: `${root}/dist/index.html`
  }
};

export default paths;
