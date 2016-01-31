'use strict';

import path from 'path';


var root = `${path.dirname(__dirname)}`;

var paths = {
  root,

  jspmConfig: `${root}/jspm.conf.js`,
  karmaConfig: `${root}/karma.conf.js`,
  protractorConfig: `${root}/protractor.conf.js`,
  jshintrc: `${root}/.jshintrc`,

  gulpfiles: [`${root}/gulpfile.js`, `${root}/gulp/**/*.js`],

  generatorTemplates: {
    modal: `${root}/gulp/generator/modal/**`,
    common: `${root}/gulp/generator/common/**`,
    mainComponent: `${root}/gulp/generator/main-component/**`,
    adminComponent: `${root}/gulp/generator/admin-component/**`
  },

  server: {
    starter: 'server/server.js',
    scripts: `${root}/server/**/*.js`
  },

  app: {
    indexHtml: `${root}/client/index.html`,
    styles: `${root}/client/app/**/*.styl`,
    scripts: `${root}/client/app/**/*.js`,
    templates: `${root}/client/app/**/*.html`,
    assets: `${root}/client/{assets/**/*,.htaccess,robots.txt,favicon.ico}`,
    common: `${root}/client/app/common`,
    components: `${root}/client/app/components`
  },

  tmp: {
    basePath: `${root}/.tmp`,
    starter: `${root}/.tmp/app/app.js`
  },

  dist: {
    basePath: `${root}/dist`,
    indexHtml: `${root}/dist/index.html`
  }
};

export default paths;
