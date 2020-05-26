const bcrypt = require("bcrypt");

exports.encrypt = async (pw) => { //converts pw into hash pw
    if (!pw) return "";
    return await bcrypt.hash(pw, 10); //10 = length of the encrypted pw
}

exports.compare = async (pw, hash) => { //compare pw with the hash stored in the db
    return await bcrypt.compare(pw, hash)
}