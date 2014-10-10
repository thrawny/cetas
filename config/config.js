var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cetas'
    },
    port: 3000,
    db: 'mongodb://localhost/cetas-development'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'cetas'
    },
    port: 3000,
    db: 'mongodb://localhost/cetas-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'cetas'
    },
    port: 3000,
    db: 'mongodb://localhost/cetas-production'
    
  }
};

module.exports = config[process.env.NODE_ENV];
