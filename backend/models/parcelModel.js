const mongoose = require("mongoose");

const parcelSchema = mongoose.Schema(
    {
        sender: {
            type: Object,
            required: true,
        },
        receiver: {
            type: Object,
            required: true,
        },
        typeofshipment: {
            type: String,
            required: [true, "Please add type of shipment"],
        },
        typeofstuff: {
            type: String,
            required: [true, "Please add type of stuff"],
        },
        weight: {
            type: Number,
            required: [true, "Please add parcel weight"],
        },
        boxsize: {
            type: String,
            required: [true, "Please add box sizing"],
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);
