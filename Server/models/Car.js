import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        carType: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        dealer: {
            type: String,
            required: true,
        }
        , images: {
            type: [String],
            required: true,
            validate: {
                validator: (val) => val.length <= 10,
                message: "You can only upload up to 10 images.",
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Car = mongoose.model('Car', carSchema);
export default Car;
