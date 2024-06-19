const mongoose = require("mongoose");

const Contactschema = new mongoose.Schema(
    {
        name: {
            type: String,
            Required: true,
        },
        email: {
            type: String,
            Required: true,
        },
        phone: {
            type: Number,
            Required: true,
        },
        
        message: {
            type: String,
            Required: true,
        },

    },
    { timestamps: true }
);
const ContactModel = mongoose.model("contact", Contactschema);

module.exports = ContactModel;
