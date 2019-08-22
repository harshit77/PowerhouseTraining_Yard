# PowerhouseTraining_Yard
Gym Project based on React(16.8) and Prisma GraphQL
Follow Below Steps to get the desired Product

1- Move to GymBackend folder using commmand Line
2- run "npm install ---> "prisma deploy" ---> "prisma generate" ---> "npm start" 
if All goes well you will see  Server is running on rahulBose in the console

Go to GymBackend-->src---> sendemail.js 
change line 9 and 10 with your credentials so that you can send the email from your account
Again you to change the receipent emaim id for that go to  GymBackend-->index.js and edit line number 7


1- Move to GymFrontFolder folder using commmand Line(Make sure GymBackend is in running state)
2- run "npm install  ---> "npm start" 

You will see a login screen and for the first you need a user for that foloowing below instructions  

Go to http://localhost:4000/

Type Below Command


 mutation signUp($username:String!,$email:String!,$password:String!) {
    signUp(username:$username,email:$email,password:$password) {
      token 
      user {
        id
        email
        password
      }
    }
  }


In the Query Variables Section create a user

{
  "username":"rahulBose",// select any username you want
  "email":"xxxxx@xxxxx.com",// select any user email you want
  "password":"xxxxxx"//// select any password you want
}
