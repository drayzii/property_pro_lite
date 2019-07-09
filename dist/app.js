"use strict";

var _express = _interopRequireDefault(require("express"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.send('Hello World');
});
app.use('/api/v1/auth', _userRoute["default"]);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log('Ok');
});