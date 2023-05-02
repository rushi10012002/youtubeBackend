const mongoose = require("mongoose");
const postTypeModelSchema = mongoose.Schema({
   type:{
    type: String,
    required: true
   }
}, {
    timestamps: true
});

module.exports=mongoose.model("tbl_category_list",postTypeModelSchema);