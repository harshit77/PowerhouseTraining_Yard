import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../css/index.css';
import TextField from '@material-ui/core/TextField';
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/DoneRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
  
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
  
const querygetUser=  gql `
    query getUser($id:ID!){
        user:getUser(id:$id) {
          id
          username
          email
        }
      }
    
    `;
    const queryUpdateUser=  gql `
    mutation updateUser($email:String!,$password:String!){
        user:updateUser(email:$email,password:$password) {
          id
          username
          email
        }
      }
    
    `;

class UpdateUser extends React.Component {
    constructor(props) {
            super(props);
            this.state={
                globalStatus:'',
                password:'',
                disabled:true,
                confirmPassword:'',
                userNameError:null,
                passwordError:null,
                confirmPasswordError:null
            }
            this.updatepassword=this.updatepassword.bind(this);
            this.updateconfirmPassword=this.updateconfirmPassword.bind(this);
            this.handleCreate=this.handleCreate.bind(this);
            this.handleEdit=this.handleEdit.bind(this);
    }
  
    handleEdit() {
        this.setState({disabled:false})
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
    if(!this.state.password) this.setState({passwordError:'DOB is required'});
    if(!this.state.confirmPassword) this.setState({confirmPasswordError:'Email is required'});
     if( !this.state.password || !this.state.confirmPassword || this.state.confirmPasswordError!=null || this.state.passwordError!=null) return;
    console.log(this.props.data.user.email);
     this.props.updateUser({
        variables:{
            email:this.props.data.user.email,
            password:this.state.password

        }
    }).then(({data})=>{
        console.log("User Updated successfully",data)
        this.setState({
        password:'',
        confirmPassword:'',
        globalStatus:'User Updated Sucessfully',
    });
    setTimeout( () => {
        this.setState({globalStatus:''})
    },10000)
    }).catch(error=>console.log("Error occured",error));
}
    render() {
        let{error,loading,user}=this.props.data;
        if(error) {
            return <div>An Error Occurred</div>
          }
          else if(loading) {
            return <div><LinearProgress/></div>
          }
          else
          {
        return (
               <Container fixed style={container.searchBox}>
                 <Paper className="paperHeader">
                     <div> Update User
                   {this.state.globalStatus=="User Updated Sucessfully" &&  <Chip
                                            icon={<DoneIcon />}
                                            label={this.state.globalStatus}
                                            color="primary"
                                            className="success"
                                        />
                                                 }
                             <Button variant="contained" color="primary" className="updateEdit noMarginLeft floatRight"  onClick={this.handleEdit}>
                                 Edit
                            </Button>
                        </div>
                        
                     <div style={{marginTop:(this.state.globalStatus=='' ? '30px':0 )}}>
                     <TextField
                      error={this.state.userNameError!=null ? true :false }
                            id="outlined-userName-input"
                            label={user.username}
                            disabled={true}
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
                            label={user.email}
                            className="halfWidth textField"
                            type="email"
                            disabled={true}
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
                            disabled={this.state.disabled==true ? true:false}
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
                            disabled={this.state.disabled==true ? true:false}
                            margin="normal"
                            value={this.state.confirmPassword}
                            onChange={this.updateconfirmPassword}
                            variant="outlined"
                        />
                         <div className="halfWidth fieldAligment">
                             <Button variant="contained" color="primary" className="buttonSearch noMarginLeft fullWidth" onClick={this.handleCreate}>
                                 Update User
                            </Button>
                        </div>

                    </div>
                 </Paper>
               </Container>
            
        )
    }
    }
}



const UpdateUserWithData= compose(
    graphql(querygetUser,{
        options:(props)=>({
            variables:{id:props.match.params.userid}
        })
    }),
    graphql(queryUpdateUser, { name: 'updateUser'}),
  )(UpdateUser);
  

export default UpdateUserWithData;

// props:({ownProps,mutate})=>({
//     createUser:(username,email,password)=> mutate({
//         variables:{username,email,password}
//     }) 
// })
// props:({mutate,data})=>{
//     return  props.match.params.userid!=undefined ?{
//         variables:{id:props.match.params.userid}
//     }:
//     {
//     forgetPassword:(username,email,password) =>
//       mutate({
//           variables:{username,email,password}
//           })
//   }}




// options:(props)=>{
//     return  props.match.params.userid!=undefined ?  {
//     variables:{id:props.match.params.userid}
// }:
// {
//     updateUser:(email,password) =>
//       mutate({
//           variables:{email,password}
//           })
//   }
// }