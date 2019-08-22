import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {graphqlDynamic} from 'react-apollo-dynamic-query'
import gql from 'graphql-tag';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
  

const query =props=>{
  return gql`
  mutation forgetPassword($username:String!,$email:String!,$password:String!) {
    forgetPassword(username:$username,email:$email,password:$password) {
      id
      email
      password
    }
  }`
}

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the Harshit '}
    </Typography>
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Forget extends React.Component {
  constructor(props){
    super(props);
    this.state={
        emailError:null,
        email:'',
        password:'',
        confirmPassword:'',
        passwordError:null,
        confirmPasswordError:null,
        globalStatus:'',  
        userName:'',
        userNameError:null,  
    }
   
    this.updateEmail=this.updateEmail.bind(this);
    this.updateuserName=this.updateuserName.bind(this);
    this.updatepassword=this.updatepassword.bind(this);
    this.updateconfirmPassword=this.updateconfirmPassword.bind(this);
    this.handleRegister=this.handleRegister.bind(this);

}
updateuserName(event) {
  event.target.value.length!=0 ? 
  this.setState({userNameError:null,userName:event.target.value})
  :
  this.setState({userNameError:'First Name is required',userName:event.target.value})
}
updateEmail(event) {
  event.target.value.length!=0 ? 
  (validateEmail(event.target.value) ? this.setState({emailError:null,email:event.target.value}): this.setState({emailError:"Email Addresse is not valid",email:event.target.value} ))
  :
  this.setState({emailError:'Email is required',email:event.target.value})
}

updatepassword(event) {
  event.target.value.length!=0 ? 
  (event.target.value.length<6 ? this.setState({passwordError:"Password is Weak",password:event.target.value}) :this.setState({passwordError:null,password:event.target.value}))
  :
  this.setState({passwordError:'Password is required',password:event.target.value})
}
updateconfirmPassword(event) {
  event.target.value.length!=0 ? 
  (event.target.value!=this.state.password ? this.setState({confirmPasswordError:"Password is doen't Match",confirmPassword:event.target.value}) :this.setState({confirmPasswordError:null,confirmPassword:event.target.value}))
  :
  this.setState({confirmPasswordError:'Confirm Password is required',confirmPassword:event.target.value})
}

handleRegister(event) {
  event.preventDefault();
    if(!this.state.userName) this.setState({userNameError:'First Name is required'});
    if(!this.state.email) this.setState({emailError:'Email is required'});
    if(!this.state.password) this.setState({passwordError:'DOB is required'});
    if(!this.state.confirmPassword) this.setState({confirmPasswordError:'Email is required'});
    if(!this.state.userName || !this.state.email || !this.state.password || !this.state.confirmPassword ) return;
    this.props.forgetPassword(this.state.userName,this.state.email,this.state.password).then(data=>{
        console.log("Regsitered Succesfully",data);
        this.setState({email:'',password:'',confirmPassword:'',userName:'',globalStatus:'Password Reset Successfully',password:this.state.password});
    }).catch(error=>{
        this.setState({email:'',password:'',confirmPassword:'',userName:'',globalStatus:'Invalid Information'});
    });
}
render() {
  const { classes } = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
       <div className="marginTopText"> {this.state.globalStatus!="" ? (this.state.globalStatus=="Invalid Information" ?  <Chip
                icon={<CloseIcon />}
                label={this.state.globalStatus}
                className={classes.chip}
                color="secondary"
              />
              : 
               <Chip
                icon={<DoneIcon />}
                label={this.state.globalStatus}
                className={classes.chip}
                color="primary"
              />
            ):null
           }
          </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
           <TextField
                      error={this.state.userNameError!=null ? true :false }
                            id="outlined-userName-input"
                            label="User Name"
                            type="text"
                            fullWidth
                            name="userName"
                            value={this.state.userName}
                            variant="outlined"
                            onChange={this.updateuserName}
                        />
            </Grid>
            <Grid item xs={12}>
              <TextField
               error={this.state.emailError!=null ? true :false }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email" 
                onChange={this.updateEmail}
                value={this.state.email}
              />
            </Grid>
          
            <Grid item xs={12}>
                      <TextField
                          error={this.state.passwordError!=null ? true :false }
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            fullWidth
                            name="password"
                            value={this.state.password}
                            variant="outlined"
                            onChange={this.updatepassword}
                        />
               </Grid>
              <Grid item xs={12}>
                         <TextField
                          error={this.state.confirmPasswordError!=null ? true :false }
                            id="outlined-confirmPassword-input"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.updateconfirmPassword}
                            variant="outlined"
                        />
                        </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleRegister}
          >
            Reset Password
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to="/SignIn">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
}
const ForgetWithStyle=withStyles(styles)(Forget);
const ForgetWithdata=graphqlDynamic(query,{
  props:({mutate,data})=>({
    forgetPassword:(username,email,password) =>
      mutate({
          variables:{username,email,password}
          })
  })
})(ForgetWithStyle);
export default ForgetWithdata;


