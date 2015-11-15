'use strict';

import gulp from 'gulp';
import {NAME, SSH_ADDRESS} from '../consts';
import path from 'path';

var rootPath = path.normalize(__dirname + '/../..');

gulp.task('release', ['dist'], () => {
  var exec = require('child_process').exec;

  var proc = exec(`
      ssh ${SSH_ADDRESS} "mkdir -p ${NAME} && rm -r -f ${NAME}/dist ${NAME}/server"
      scp -r ${rootPath}/dist ${rootPath}/server ${rootPath}/package.json ${SSH_ADDRESS}:~/${NAME}
      ssh ${SSH_ADDRESS} "nvm use 4 && cd ${NAME} && npm i --production --no-optional"
    `);

  proc.stdout.on('data', data => console.log(data));
  proc.stderr.on('data', data => console.log(data));
});
