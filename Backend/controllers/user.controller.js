exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// TODO Swap out to new roles designe_engineer etc
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};