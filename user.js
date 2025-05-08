const {Router}= require("express");
const router=Router();
const User=require("../models/user");

router.get("/signin",(req,res)=>{
    return res.render("signin.ejs")
});
router.get("/signup",(req,res)=>{
    return res.render("signup.ejs")
});
router.post("/signin", async (req,res)=>{
    const {email,password}= req.body;
    try {
    const token= await User.matchPasswordAndGenerateToken(email,password);
    
    return res.cookie("token",token).redirect("/");
        
    } catch (error) {
        return res.render("signin.ejs",{
            error:"incorrect Email or password"
        })
    }
})

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

router.post("/signup",async (req,res)=>{
    const {fullName,email,password}= req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})

module.exports=router;