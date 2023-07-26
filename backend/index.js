const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())


mongoose.connect('mongodb+srv://rahulraj6263707:Pradeep123@blog0.iis1vtb.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const registerSchema = new mongoose.Schema({
name: String,
email: String,
password:String
})
const postSchema = new mongoose.Schema({
    name: String,
    title: String,
    category:String,
    image:String,
    description:String
})


const register = mongoose.model('blogs', registerSchema);
const post = mongoose.model('blog_feed',postSchema);


app.post("/postblog",async (req,resp)=>{
    let obj = {
        name:req.body.name,
        title:req.body.title,
        category:req.body.category,
        image:req.body.image,
        description:req.body.description
    }
    console.log(obj);
    let p = new post(obj);
    let res = await p.save();
    resp.send(res);
})

app.get("/explore",async (req,resp)=>{
    let res = await post.find({});
    resp.send(res);
})








app.post("/register",async (req,resp)=>{
    let obj = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    console.log(obj);
    let reg = new register(obj);
    let res = await reg.save();
    resp.send(res);

})

app.post("/login",async (req,resp)=>{
    let obj = {
        email:req.body.email,
        password:req.body.password
    }
    console.log(obj);
    let user = await register.findOne(obj).select("-password");
    resp.send(user);

})


app.listen(4000);