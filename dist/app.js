"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
_dotenv2.default.config();
require('./database/index.js');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _homeRoutesjs = require('./routes/homeRoutes.js'); var _homeRoutesjs2 = _interopRequireDefault(_homeRoutesjs);
var _userRoutesjs = require('./routes/userRoutes.js'); var _userRoutesjs2 = _interopRequireDefault(_userRoutesjs);
var _tokenRoutesjs = require('./routes/tokenRoutes.js'); var _tokenRoutesjs2 = _interopRequireDefault(_tokenRoutesjs);
var _studentRoutesjs = require('./routes/studentRoutes.js'); var _studentRoutesjs2 = _interopRequireDefault(_studentRoutesjs);
var _photoRoutesjs = require('./routes/photoRoutes.js'); var _photoRoutesjs2 = _interopRequireDefault(_photoRoutesjs);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, "upload")));
  }
  routes() {
    this.app.use("/", _homeRoutesjs2.default);
    this.app.use("/students", _studentRoutesjs2.default);
    this.app.use("/users", _userRoutesjs2.default);
    this.app.use("/token", _tokenRoutesjs2.default);
    this.app.use("/photos", _photoRoutesjs2.default);
  }
}

exports. default = new App().app;
