const app = require("../server");

module.exports = (req, res) => {
    return app(req, res);
};