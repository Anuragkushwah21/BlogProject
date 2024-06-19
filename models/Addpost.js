const mongoose = require('mongoose')

const AddpostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      Required: true,
    },
    description: {
      type: String,
      Required: true,
    },
    image:{
        public_id:{
            type:String,
            Required:true,
        },
        url:{
            type:String,
            Required:true,
        },
    },
    role: {
      type: String,
      Required: "post",
    },
  },
  { timestamps: true }
)

const AddpostModel = mongoose.model("post", AddpostSchema);

module.exports = AddpostModel;