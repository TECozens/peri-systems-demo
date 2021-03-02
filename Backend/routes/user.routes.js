const {authJwt} = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/auth/all", controller.allAccess);

    app.get(
        "/api/auth/designer",
        [authJwt.verifyToken, authJwt.isDesigner],
        controller.designerBoard);

    app.get(
        "/api/auth/technical",
        [authJwt.verifyToken, authJwt.isTechnical],
        controller.technicalBoard
    );

    app.get(
        "/api/auth/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};