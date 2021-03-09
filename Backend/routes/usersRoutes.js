const express = require("express");
const UserRouter = express.Router();
const user = require("../models/user.model");
const role = require("../models/role.model");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {pagingOptions, getMaxPages} = require("../utils/pagingOptions.js")

urlencodedParser = bodyParser.urlencoded({extended: false});
jsonParser = bodyParser.json();

UserRouter.get(
    "/api/users/getUsersWithRoleID/:roleID",
    jsonParser,
    (req, res) => {
        let roleId = new mongoose.Types.ObjectId(req.params.roleID);
        user.find({roles: roleId}, (err, data) => {
            if (err) {
                return res.json({success: false, error: err});
            } else {
                return res.json({success: true, data: data});
            }
        });
    }
);

UserRouter.get("/api/users/getUserByID/:userID", jsonParser, (req, res) => {
    let userId = new mongoose.Types.ObjectId(req.params.userID);
    user.findById(userId, (err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true, data: data});
        }
    });
});

UserRouter.get(
    "/api/users/getUsers",
    jsonParser,
    (req, res) => {
        user.find((err, data) => {
            if (err) {
                return res.json({success: false, error: err});
            } else {
                return res.json({success: true, data: data});
            }
        });
    }
);

UserRouter.get("/api/users/getDesignerRoleID", jsonParser, (req, res) => {
    role.find({name: "designer"}, (err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true, data: data});
        }
    });
});

UserRouter.get("/api/users/getTechnicalLeadRoleID", jsonParser, (req, res) => {
    role.find({name: "technical"}, (err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true, data: data});
        }
    });
});

UserRouter.get('/api/users', jsonParser, async (req, res) => {
    let pageSize = 3
    let page = req.query.page
    let query = req.query.query
    let regex = new RegExp(query, 'i')
    const maxPages = await getMaxPages(user, {firstname: {$regex: regex}}, pageSize)

    user.find(
        {firstname: {$regex: regex}},
        ['firstname', 'lastname', 'email'],
        pagingOptions(page, pageSize),
        (err, data) => {
            res.json({
                success: err !== null,
                error: err,
                maxPages,
                data: data,
            })
        })
})

module.exports = UserRouter;
