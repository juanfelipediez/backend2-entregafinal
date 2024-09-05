import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },

    purchase_datetime: {
        type: Date,
        required: true,
    }, 

    amount: {
        type: Number,
        required: true,
    },

    purchaser: {
        type: String,
        ref: 'User',
        required: true,
    }
})

export const ticketModel = mongoose.model('Ticket', ticketSchema)