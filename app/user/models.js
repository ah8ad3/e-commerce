const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    info: {
        first_name: String,
        last_name: String,
        phone: String,
        is_staff: Boolean,
        is_active: Boolean,
        is_mobile_verified: Boolean,
        mobile_verified_code: String,
        mobile_verified_at: Date,
        is_email_verified: Boolean,
        email_verified_code: String,
        email_verified_at: Date,
        pass_reset_code: String,
        pass_reset_created: Date,
        pass_reset_request_number: Number,
        date_joined: Date
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel: UserModel};
