const nodemailer = require('nodemailer');
const hbs=require('nodemailer-express-handlebars');
const path=require('path');
const SendEmail= async(receipent,loggedInUser,createdData,typeofOperation,category)=>{
  console.log("send email",receipent,loggedInUser,createdData,typeofOperation,category);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xxxx@xxxxx.com',
      pass: 'xxxxxx'
    }
  });
  
  transporter.use('compile',hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: './views/',
      layoutsDir: './views/',
      defaultLayout: null,
    },
    viewPath:'./views/'
  }))
  const mailOptions = {
    from: 'xxxxx.xxxxxx',
    to: `${receipent}`,
    subject: `PowerHouse Training Yard has a created a NEW user`,
    template:loggedInUser!=null ? 'home': 'schedule',
    context:{
      loggedInUser:loggedInUser,createdData:createdData,typeofOperation:typeofOperation,category:category
    }

  };
 await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}


module.exports={
  SendEmail
}



