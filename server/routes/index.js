const askRouter = require('./asks');
const userRouter = require('./users');
const fundingRouter = require('./funding');
const contentRouter = require('./contents');

const routers = [askRouter, userRouter, fundingRouter, contentRouter];

module.exports = routers;
