import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../css/index.css';
import TextField from '@material-ui/core/TextField';
import {graphqlDynamic} from 'react-apollo-dynamic-query'
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/DoneRounded';

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
const container= {
    widthContainer : {
        width:'90%',
        margin: '0 auto',
        marginTop: '2%'
    },
    searchBox: {
        marginTop: '2%'
    }
}
  
const query= props =>{
    return gql `
    mutation createUser($username:String!,$email:String!,$password:String!) {
        createUser(username:$username,email:$email,password:$password) {
          username
          id
          email
        }
      }
    `
}

class User extends React.Component {
    constructor(props) {
            super(props);
            this.state={
                globalStatus:'',
                userName:'',
                email:'',
                password:'',
                confirmPassword:'',
                userNameError:null,
                emailError:null,
                passwordError:null,
                confirmPasswordError:null
            }
            this.updateuserName=this.updateuserName.bind(this);
            this.updateemail=this.updateemail.bind(this);
            this.updatepassword=this.updatepassword.bind(this);
            this.updateconfirmPassword=this.updateconfirmPassword.bind(this);
            this.handleCreate=this.handleCreate.bind(this);
    }
    updateuserName(event) {
        event.target.value.length!=0 ? 
        this.setState({userNameError:null,userName:event.target.value})
        :
        this.setState({userNameError:'First Name is required',userName:event.target.value})
   }
   updateemail(event) {
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

handleCreate() {
    console.log(this.state.userName);
    if(!this.state.userName) this.setState({userNameError:'First Name is required'});
    if(!this.state.email) this.setState({emailError:'Last Name is required'});
    if(!this.state.password) this.setState({passwordError:'DOB is required'});
    if(!this.state.confirmPassword) this.setState({confirmPasswordError:'Email is required'});
     if(!this.state.userName ||!this.state.email  || !this.state.password || !this.state.confirmPassword || this.state.confirmPasswordError!=null || this.state.passwordError!=null) return;
    console.log(this.state.userName);
    this.props.createUser(this.state.userName,this.state.email,this.state.password).then(({data})=>{
        console.log("User created successfully",data)
        this.setState({ userName:'',
        userName:'',
        email:'',
        password:'',
        confirmPassword:'',
        globalStatus:'User created Sucessfully',
    });
    setTimeout( () => {
        this.setState({globalStatus:''})
    },10000)
    }).catch(error=>console.log("Error occured",error));
}
    render() {
        return (
               <Container fixed style={container.searchBox}>
                 <Paper className="paperHeader">
                     <div> Create User
                   {this.state.globalStatus=="User created Sucessfully" &&  <Chip
                                            icon={<DoneIcon />}
                                            label={this.state.globalStatus}
                                            color="primary"
                                            className="success"
                                        />
                                                 }
                        </div>
                     <div style={{marginTop:(this.state.globalStatus=='' ? '30px':0 )}}>
                     <TextField
                      error={this.state.userNameError!=null ? true :false }
                            id="outlined-userName-input"
                            label="User Name"
                            className="halfWidth textField"
                            type="text"
                            name="userName"
                            value={this.state.userName}
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateuserName}
                        />
                        <TextField
                         error={this.state.emailError!=null ? true :false }
                            id="outlined-email-input"
                            label="Email"
                            className="halfWidth textField"
                            type="email"
                            name="email"
                            margin="normal"
                            value={this.state.email}
                            variant="outlined"
                            onChange={this.updateemail}
                        />
                         <TextField
                          error={this.state.passwordError!=null ? true :false }
                            id="outlined-password-input"
                            label="Password"
                            className="halfWidth textField"
                            type="password"
                            name="password"
                            value={this.state.password}
                            margin="normal"
                            variant="outlined"
                            onChange={this.updatepassword}
                        />
                         <TextField
                          error={this.state.confirmPasswordError!=null ? true :false }
                            id="outlined-confirmPassword-input"
                            label="Confirm Password"
                            className="halfWidth textField"
                            type="password"
                            name="confirmPassword"
                            margin="normal"
                            value={this.state.confirmPassword}
                            onChange={this.updateconfirmPassword}
                            variant="outlined"
                        />
                         <div className="halfWidth fieldAligment">
                             <Button variant="contained" color="primary" className="buttonSearch noMarginLeft fullWidth" onClick={this.handleCreate}>
                                 Create User
                            </Button>
                        </div>

                    </div>
                 </Paper>
               </Container>
            
        )
    }
}

const UserWithData=graphqlDynamic(query,{
    props:({ownProps,mutate})=>({
        createUser:(username,email,password)=> mutate({
            variables:{username,email,password}
        }) 
    })
})(User);
export default UserWithData;
