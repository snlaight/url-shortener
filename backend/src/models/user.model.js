const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema (
    {
       email: {type : String, required: true},
       createdUrls: [{type: Schema.Types.ObjectId, ref:"urlmodel"}]
    },
    {
        timestamps: {
            createdAt:'created_at',
            updatedAt:'updated_at'
        }
    }
)

const UserModel = mongoose.model("user", user);
module.exports=UserModel;