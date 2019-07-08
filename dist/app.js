"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get('/', function (req, res) {
  res.send('Hello World');
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log('Ok');
});