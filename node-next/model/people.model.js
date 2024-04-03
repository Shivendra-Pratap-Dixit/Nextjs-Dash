const mongoose=require("mongoose");


const peopleSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        default:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
    },
    address:{
        type:String,
        default:"Lucknow"
    },
    state:{
        type:String,
        default:"Uttar Pradesh"
    }
},{
    versionKey:false
})

const People=mongoose.model('People',peopleSchema);
module.exports=People;