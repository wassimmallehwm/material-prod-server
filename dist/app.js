'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (req, res) {
    res.json({ msg: 'Welcome bro' });
});

app.listen(3000, function () {
    console.log('Running on port 3000');
});
//# sourceMappingURL=app.js.map