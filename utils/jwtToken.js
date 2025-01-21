export const generateToken =(admin,message,statusCode,res) =>{
    const token = admin.generateJsonWebToken();
    res.status(statusCode).cookie("token",token,{
        expires :new Date(Date.now()+process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly:true
    }).json({
        success:true,
        message,
        token,
        admin
    })
}