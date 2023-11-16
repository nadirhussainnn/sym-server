import mongoose from "mongoose";
const schema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    picturePath:{
        type:String,
        default:""
    },
    location:String,
    description:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean
    },
    comment:{
        type:Array,
        default:[]
    }
},{timestamps:true});

const Post = mongoose.model('posts', schema)
export default Post;

