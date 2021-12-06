const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlStore = new Schema (
    {
        longUrl: String,
        shortUrl: String,
        timesClicked: Number,
        createdBy: [{type: Schema.Types.ObjectId, ref:"user"}],
    },
    {
        timestamps: {
            createdAt:'created_at',
            updatedAt:'updated_at'
        }
    }
)

const URL = mongoose.model('urlmodel', urlStore);
module.exports=URL;