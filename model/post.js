const mongoose = require("mongoose");
const postModelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postTitle: {
        type: String,
        required: true,
    },
    postSubTitle: {
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    like: {
        type: Array,
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    thumbnail:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: true
    },
    typeId:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports=mongoose.model("tbl_post_table",postModelSchema);