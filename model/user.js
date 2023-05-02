const mongoose = require("mongoose");
const userModelSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports=mongoose.model("tbl_user_data",userModelSchema);