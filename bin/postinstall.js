#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const sh = require('shelljs');

const spawnOptions = {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit'
};

// Install ruby dependencies
const bundleProcess = spawn('bundle', [], spawnOptions);
bundleProcess.on('close', code => {
  if (code) {
    return process.exit(code);
  }

  copyFilesFromNodeModules();
});

function copyFilesFromNodeModules() {
  // jquery
  sh.cp(getBasePath('node_modules', 'jquery', 'dist', 'jquery.slim.min.js'), getBasePath('assets', 'js', '--jquery.slim.min.js'));

  // foundation
  sh.cp(getBasePath('node_modules', 'foundation-sites', 'dist', 'js', 'foundation.min.js'), getBasePath('assets', 'js', '--foundation.min.js'));
  sh.mkdir(getBasePath('_sass', '--foundation'));
  sh.cp('-r', getBasePath('node_modules', 'foundation-sites', 'scss'), getBasePath('_sass', '--foundation', 'scss'));
  sh.cp('-r', getBasePath('node_modules', 'foundation-sites', '_vendor'), getBasePath('_sass', '--foundation', '_vendor'));

  // motion-ui
  sh.cp(getBasePath('node_modules', 'motion-ui', 'dist', 'motion-ui.min.js'), getBasePath('assets', 'js', '--motion-ui.min.js'));
  sh.cp(getBasePath('node_modules', 'motion-ui', 'dist', 'motion-ui.min.css'), getBasePath('assets', 'css', '--motion-ui.min.css'));
  
  // magnific-popup
  sh.cp(getBasePath('node_modules', 'magnific-popup', 'dist', 'jquery.magnific-popup.min.js'), getBasePath('assets', 'js', '--jquery.magnific-popup.min.js'));
  sh.cp(getBasePath('node_modules', 'magnific-popup', 'dist', 'magnific-popup.css'), getBasePath('assets', 'css', '--magnific-popup.css'));
}

function getBasePath(...paths) {
  return path.join(__dirname, '..', ...paths);
}
