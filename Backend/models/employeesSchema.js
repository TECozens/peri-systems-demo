const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const employeeSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: {
            first: String,
            last: String,
        },
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("employees", employeeSchema);

