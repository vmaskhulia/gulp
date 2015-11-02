'use strict';

import gulp from 'gulp';
import pkg from '../../package.json';
import {SERVER_SSH, RELEASE_NAME} from '../consts';

gulp.task('release', ['dist'], () => {
  var exec = require('child_process').exec;
  var commitMsg = `chore(release): v${pkg.version}`;

  var proc = exec(`
    rm -r -f ${RELEASE_NAME}/dist ${RELEASE_NAME}/server && \
    cp -r dist server package.json ${RELEASE_NAME} && \
    cd ${RELEASE_NAME} && npm i --production --no-optional && \
    git add . && git commit -m "${commitMsg}" && git push origin master && \
    ssh ${SERVER_SSH} 'cd ${RELEASE_NAME} && git pull origin master' \
  `);

  proc.stdout.on('data', data => console.log(data));
  proc.stderr.on('data', data => console.log(data));
});
