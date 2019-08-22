const nodemailer = require('nodemailer');
const hbs=require('nodemailer-express-handlebars');
const path=require('path');
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'hsahu77588@gmail.com',
//     pass: 'Hsahu77@123p'
//   }
// });

// const mailOptions = {
//   from: 'hsahu77588@gmail.com',
//   to: 'hsahu77@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };


const SendEmail= async(receipent,loggedInUser,createdData,typeofOperation,category)=>{
  console.log("send email",receipent,loggedInUser,createdData,typeofOperation,category);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hsahu77588@gmail.com',
      pass: 'Hsahu77@123p'
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
    from: 'hsahu77588@gmail.com',
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



