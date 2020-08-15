const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    questions:[
        {
            // this is the list of question that this user has asked
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ],
    answers:[
        {
            // this is the list of answers that this user has written
            type:mongoose.Schema.Types.ObjectId,
            ref:'Answer'
        }
    ],
    interests:[
        {
            type:String
        }
    ],
    languages:[
        {
            type:String
        }
    ],
    follow:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Follow'
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);

module.exports=User;