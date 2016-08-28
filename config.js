var config = {
  production: {
    url: 'http://localhost',
    server: {
      host: '127.0.0.1',
      port: '80'
    }
  },
  development: {
    url: 'http://localhost:3000',
    server: {
      host: '127.0.0.1',
      port: '3000'
    }
  }
};

module.exports = config;