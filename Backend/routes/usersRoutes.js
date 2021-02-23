const express = require("express");
const UserRouter = express.Router();
const user = require("../models/user.model");
const role = require("../models/role.model");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

urlencodedParser = bodyParser.urlencoded({ extended: false });
jsonParser = bodyParser.json();

UserRouter.get(
    "/api/users/getUsersWithRoleID/:roleID",
    jsonParser,
    (req, res) => {
        let roleId = new mongoose.Types.ObjectId(req.params.roleID);
        user.find({ roles: roleId }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err });
            } else {
                return res.json({ success: true, data: data });
            }
        });
    }
);

UserRouter.get("/api/users/getDesignerRoleID", jsonParser, (req, res) => {
    role.find({ name: "designer" }, (err, data) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true, data: data });
        }
    });
});

module.exports = UserRouter;