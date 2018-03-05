
class AbstractController {
    options(req, res, next) {
        res.send({ "ok": true });
    }
}

module.exports = AbstractController;