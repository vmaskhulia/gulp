'use strict';

import gulp from 'gulp';
import {NAME, SSH_ADDRESS, LUCY_SSH_ADDRESS} from '../consts';
import path from 'path';
var $ = require('gulp-load-plugins')();

var rootPath = path.normalize(__dirname + '/../..');

const argv = $.util.env;

gulp.task('release', ['dist'], () => {
  var exec = require('child_process').exec;

  var lucyFlag = argv.lucy || argv.l;
  var address = lucyFlag ? LUCY_SSH_ADDRESS : SSH_ADDRESS;

  var proc = exec(`
      ssh ${address} "mkdir -p ${NAME} && rm -r -f ${NAME}/dist ${NAME}/server"
      scp -r ${rootPath}/dist ${rootPath}/server ${rootPath}/package.json ${address}:~/${NAME}
      ssh ${address} "nvm use 4 && cd ${NAME} && npm i --production --no-optional"
    `);

  proc.stdout.on('data', data => console.log(data));
  proc.stderr.on('data', data => console.log(data));
});
