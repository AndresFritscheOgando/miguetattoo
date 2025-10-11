const path = require('path');

const { resolve } = path;

const aliases = {
  '@': resolve(__dirname, 'src'),
  '@components': resolve(__dirname, 'src/components'),
  '@lib': resolve(__dirname, 'src/lib'),
};

module.exports = aliases;
