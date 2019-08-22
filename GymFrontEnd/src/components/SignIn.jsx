import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {graphqlDynamic} from 'react-apollo-dynamic-query'
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
  
const query= props =>{
  return gql `
  mutation login($email:String!,$password:String!) {
    login(email:$email,password:$password) {
      token
      user {
        id
        username
        password
        email
      }
    }
  }
  `
}

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      {' Harshit.'}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
 class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state={
      globalStatus:'',
        emailError:null,
        passwordError:null,
        email:'',
        password:''
    }
    this.updateEmail=this.updateEmail.bind(this);
    this.updatePassword=this.updatePassword.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
}
updateEmail(event) {
  event.target.value.length!=0 ? 
  (validateEmail(event.target.value) ? this.setState({emailError:null,email:event.target.value}): this.setState({emailError:"Email Addresse is not valid",email:event.target.value} ))
  :
  this.setState({emailError:'Email is required',email:event.target.value})
}

updatePassword(event) {
  event.target.value.length!=0 ? 
  (event.target.value.length<6 ? this.setState({passwordError:"Password is Weak",password:event.target.value}) :this.setState({passwordError:null,password:event.target.value}))
  :
  this.setState({passwordError:'Password is required',password:event.target.value})
}
handleLogin(event) {
  event.preventDefault();
  console.log("handleLogin");
    if(!this.state.email) this.setState({emailError:"Email Required"});
    if(!this.state.password) this.setState({passwordError:"PassWord Required"});
    if(!this.state.email || !this.state.password) return;
    this.props.loginUser(this.state.email,this.state.password).then(({data})=>{
        console.log("Userlogged In SuccFULLY",data);
        localStorage.setItem('token',data.login.token);
        window.location.href='/';

    }).catch(error=>{
        this.setState({email:'',password:'',globalStatus:'Invalid Credentails',emailError:'Email is required'});
        console.error("Error",error.message);
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
          Sign in
        </Typography>
        {this.state.globalStatus!="" &&   <Chip
                icon={<CloseIcon />}
                label={this.state.globalStatus}
                className={classes.chip}
                color="secondary"
              />
           }
        <form className={classes.form} noValidate>
          <TextField
            error={this.state.emailError!=null ? true :false }
            variant="outlined"
            fullWidth
            type="email"
            id="outlined-email-input"
            label="Email Address"
            name="email"
            margin="normal"
            onChange={this.updateEmail}
            value={this.state.email}
          />
        
          <TextField
            error={this.state.passwordError!=null ? true :false }
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            onChange={this.updatePassword}
            type="password"
            value={this.state.password}
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2"> */}
            
              {/* </Link> */}
            </Grid>
            <Grid item>
              <Link to="/signUp">
              Forgot password?
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
const SignInWithStyle= withStyles(styles)(SignIn);
const SignWithData=graphqlDynamic(query,{
  props:({mutate}) =>({
      loginUser:(email,password)=> mutate({
          variables:{email,password}
      })
  })
})(SignInWithStyle);
export default SignWithData;