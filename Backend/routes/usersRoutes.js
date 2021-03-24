const authJwt = require("../middlewares/authJwt");

const express = require("express");
const UserRouter = express.Router();
const user = require("../models/user.model");
const role = require("../models/role.model");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { pagingOptions, getMaxPages } = require("../utils/pagingOptions.js");
const jsonParser = bodyParser.json();

UserRouter.get(
    "/api/users/getUsersWithRoleID/:roleID",
    jsonParser,
    (req, res) => {
        let roleId = new mongoose.Types.ObjectId(req.params.roleID);
        authJwt.verifyToken(req, res, () => {
            user.find({ roles: roleId }, (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err,
                    });
                } else {
                    return res.json({
                        success: true,
                        data: data,
                    });
                }
            });
        });
    }
);

UserRouter.get("/api/users/getUserByID/:userID", jsonParser, (req, res) => {
    let userId = new mongoose.Types.ObjectId(req.params.userID);
    authJwt.verifyToken(req, res, () => {
        user.findById(userId, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err });
            } else {
                return res.json({ success: true, data: data });
            }
        });
    });
});

UserRouter.get("/api/users/getUsers", jsonParser, (req, res) => {
    authJwt.verifyToken(req, res, () => {
        user.find((err, data) => {
            if (err) {
                return res.json({ success: false, error: err });
            } else {
                return res.json({ success: true, data: data });
            }
        });
    });
});

UserRouter.get("/api/users/getDesignerRoleID", jsonParser, (req, res) => {
    authJwt.verifyToken(req, res, () => {
        role.find({ name: "designer" }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err });
            } else {
                return res.json({ success: true, data: data });
            }
        });
    });
});

UserRouter.get("/api/users/getTechnicalLeadRoleID", jsonParser, (req, res) => {
    authJwt.verifyToken(req, res, () => {
        role.find({ name: "technical" }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err });
            } else {
                return res.json({ success: true, data: data });
            }
        });
    });
});

UserRouter.get("/api/users", jsonParser, async (req, res) => {
    let pageSize = 6;
    let page = req.query.page;
    let query = req.query.query;
    let filter = null;
    if (query) {
        let firstName, lastName;
        if (query.split(" ").length > 1) {
            [firstName, lastName] = query.split(" ");
            let firstname = new RegExp(firstName, "i");
            let lastname = new RegExp(lastName, "i");
            let email = new RegExp(query, "i");
            filter = {
                $or: [
                    {
                        $and: [
                            { firstname: { $regex: firstname } },
                            { lastname: { $regex: lastname } },
                        ],
                    },
                    { email: { $regex: email } },
                ],
            };
        } else {
            console.log("hi?");
            firstName = query;
            lastName = query;
            let firstname = new RegExp(firstName, "i");
            let lastname = new RegExp(lastName, "i");
            let email = new RegExp(query, "i");
            filter = {
                $or: [
                    {
                        $or: [
                            { firstname: { $regex: firstname } },
                            { lastname: { $regex: lastname } },
                        ],
                    },
                    { email: { $regex: email } },
                ],
            };
        }
    }
    user.find(
        filter,
        ["firstname", "lastname", "email", "roles"],
        pagingOptions(page, pageSize),
        (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    error: err,
                });
            } else {
                user.countDocuments(filter, (err, count) =>
                    res.json({
                        success: err !== null,
                        error: err,
                        maxPages: Math.ceil(count / pageSize),
                        data: data,
                    })
                );
            }
        }
    ).populate("roles");
});

module.exports = UserRouter;
