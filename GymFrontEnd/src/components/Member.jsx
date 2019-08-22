import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../css/index.css';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CustomDatePicker from './CustomDatePicker.jsx';
import Button from '@material-ui/core/Button';
import {graphqlDynamic} from 'react-apollo-dynamic-query';
import gql from 'graphql-tag';
import Chip from '@material-ui/core/Chip';
import CustomRadioButton from './CustomRadioButton.jsx';

const filterOptions={
    name:'',
    typeEnabled:'Male',
    options:[{
        name:'Male',
        enabled:true
    },
    {
        name:'Female',
        enabled:false
    }]
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
const query= props =>{
    return gql `
    mutation createMember($firstName:String!, $lastName:String!,$email:String!,
        $gender:String!,
        $phoneNumber:String!
        $alternateNumber:String!
        $dob:String!,$address:String!) {
      createMember(firstName:$firstName,lastName:$lastName,,email:$email,gender:$gender,
        phoneNumber:$phoneNumber,alternateNumber:$alternateNumber,DOB:$dob,address:$address) {
        id
        firstName
        lastName
        email
      }
    }
    `
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
class Member extends React.Component {
    constructor(props) {
            super(props);
            this.state={
                firstName:'',
                lastName:'',
                email:'',
                gender:'Male',
                phoneNumber:'',
                alternateNumber:'',
                dob:null,
                address:'',
                firstNameError:null,
                lastNameError:null,
                emailError:null,
                genderError:null,
                phoneNumberError:null,
                alternateNumberError:null,
                dobError:null,
                addressError:null,
                filterOptions:filterOptions,
                globalStatus:''
            };
            this.updatefirstName=this.updatefirstName.bind(this);
            this.updatelastName=this.updatelastName.bind(this);
            this.updateemail=this.updateemail.bind(this);
            this.updatephoneNumber=this.updatephoneNumber.bind(this);
            this.updatealternateNumber=this.updatealternateNumber.bind(this);
            this.updateaddress=this.updateaddress.bind(this);
            this.handleCreate=this.handleCreate.bind(this);
            this.handleselectDate=this.handleselectDate.bind(this);
            this.handleFilter=this.handleFilter.bind(this);
    }
    handleFilter(filtervalue) {
        console.log("filtered values",filtervalue);
        const filteredOptions={
            name:'',
            typeEnabled:filtervalue,
            options:this.state.filterOptions.options.map(option=>{
                option.name===filtervalue ? option.enabled=true : option.enabled=false
                return option;
            })
        }

        this.setState({filterOptions:filteredOptions,gender:filtervalue});
      
    }
    updatefirstName(event) {
         event.target.value.length!=0 ? 
         this.setState({firstNameError:null,firstName:event.target.value})
         :
         this.setState({firstNameError:'First Name is required',firstName:event.target.value})
    }
    updatelastName(event) {
        event.target.value.length!=0 ? 
         this.setState({lastNameError:null,lastName:event.target.value})
         :
         this.setState({lastNameError:'Last Name is required',lastName:event.target.value})
    }
    updateemail(event) {
        event.target.value.length!=0 ? 
        (validateEmail(event.target.value) ? this.setState({emailError:null,email:event.target.value}): this.setState({emailError:"Email Addresse is not valid",email:event.target.value} ))
        :
        this.setState({emailError:'Email is required',email:event.target.value})
    }
    updatephoneNumber(event) {
        event.target.value.length!=0 ? 
        ( event.target.value.length!=10 ?  this.setState({phoneNumberError:'Phone Number has to be 10 digit',phoneNumber:event.target.value}) : (isNaN(event.target.value) ? this.setState({phoneNumberError:'Number is not a digit',phoneNumber:event.target.value}) :this.setState({phoneNumberError:null,phoneNumber:event.target.value}) ))
        :
        this.setState({phoneNumberError:'Phone Number is required',phoneNumber:event.target.value})
    }
    updatealternateNumber(event) {
        event.target.value.length!=0 ? 
        ( event.target.value.length!=10 ?  this.setState({alternateNumberError:'Alternate Number has to be 10 digit',alternateNumber:event.target.value}) : (isNaN(event.target.value) ? this.setState({phoneNumberError:'Number is not a digit',phoneNumber:event.target.value}) :this.setState({alternateNumberError:null,alternateNumber:event.target.value})))
        :
        this.setState({alternateNumberError:'Alternate Number is required',alternateNumber:event.target.value})
    }
    updateaddress(event) {
        event.target.value.length!=0 ? 
        this.setState({addressError:null,address:event.target.value})
        :
        this.setState({addressNumberError:'Address is required',address:event.target.value})
  
        this.setState({address:event.target.value})
    }
    handleCreate() {
        console.log(this.state.firstName,this.state.lastName,this.state.dob,this.state.email,this.state.gender,this.state.phoneNumber,this.state.alternateNumber,this.state.address);
        if(!this.state.firstName) this.setState({firstNameError:'First Name is required'});
        if(!this.state.lastName) this.setState({lastNameError:'Last Name is required'});
        if(!this.state.dob) this.setState({dobError:'DOB is required'});
        if(!this.state.email) this.setState({emailError:'Email is required'});
        if(!this.state.gender) this.setState({genderError:'Gender is required'});
        if(!this.state.phoneNumber) this.setState({phoneNumberError:'Phone Number is required'});
        if(!this.state.alternateNumber) this.setState({alternateNumberError:'Alternate Number is required'});
        if(!this.state.address) this.setState({addressError:' Address is required'});
         if(!this.state.firstName ||!this.state.lastName  || !this.state.dob || !this.state.email || this.state.emailError!=null || this.state.phoneNumberError!=null || this.state.alternateNumberError!=null || !this.state.gender || !this.state.phoneNumber || !this.state.alternateNumber || !this.state.address) return;
        console.log(this.state.firstName);
        this.props.createMember(this.state.firstName,this.state.lastName,this.state.email,this.state.gender,this.state.phoneNumber,this.state.alternateNumber,this.state.dob,this.state.address).then(({data})=>{
            console.log("Data created successfully",data)
            this.setState({ firstName:'',
            lastName:'',
            email:'',
            gender:'',
            phoneNumber:'',
            alternateNumber:'',
            dob:'',
            address:''
        });
        this.props.next(data.createMember.id,data.createMember.firstName,data.createMember.lastName)
        }).catch(error=>{this.setState({globalStatus:"Member Already exists"});
        console.log("Error occured",error)
    });
    }

    handleselectDate(date) {
        console.log(date);
        this.state.dob===new Date() ? this.setState({dobError:'DOB is required'}) :this.setState({dob:date,dobError:null})
    }
    render() {
        return (
               <Container fixed style={container.searchBox } className="noPaddingmb">
                 <Paper className="paperHeader" elevation="14">
                     <div>Create Member
                       <span className="marginLeftText"> {this.state.globalStatus!='' &&  <Chip
                                                icon={<CloseIcon />}
                                                label={this.state.globalStatus}
                                                color="secondary"
                                                />
                            }
                            </span>
                            </div>
                     <div>
                         
                     <TextField
                         error={this.state.firstNameError!=null ? true :false }
                            id="outlined-firstName-input"
                            label="First Name"
                            className="halfWidth textField"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            margin="normal"
                            onChange={this.updatefirstName}
                            variant="outlined"
                        />
                        <TextField
                           error={this.state.lastNameError!=null ? true :false }
                            id="outlined-lastName-input"
                            label="Last Name"
                            className="halfWidth textField"
                            type="text"
                            onChange={this.updatelastName}
                            value={this.state.lastName}
                            name="lastName"
                            margin="normal"
                            variant="outlined"
                        />
                        <div className="dateSearchContainer">
                             <CustomRadioButton radioSelected={this.handleFilter} radioOption={filterOptions} selected={this.state.filterOptions.typeEnabled} />
                             </div>
                        <TextField
                            id="outlined-email-input"
                            label="email"
                            className="halfWidth textField"
                            error={this.state.emailError!=null ? true :false }
                            type="email"
                            value={this.state.email}
                            onChange={this.updateemail}
                            name="phoneNumber"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-phoneNumber-input"
                            label="Phone Number"
                            error={this.state.phoneNumberError!=null ? true :false }
                            className="halfWidth textField"
                            type="text"
                            value={this.state.phoneNumber}
                            onChange={this.updatephoneNumber}
                            name="phoneNumber"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-alternateNumber-input"
                            label="Alternate Number"
                            error={this.state.alternateNumberError!=null ? true :false }
                            className="halfWidth textField"
                            value={this.state.alternateNumber}
                            onChange={this.updatealternateNumber}
                            type="text"
                            name="alternateNumber"
                            margin="normal"
                            variant="outlined"
                        />
                          <CustomDatePicker labelName="DOB" className="halfWidth fieldAligment" selectDate={this.handleselectDate}/> 
                         {this.state.dobError!=null ? <div className="error marginLeftText">Please Select Date of Birth</div> :null}
                          <TextField
                            id="outlined-address-input"
                            label="Address"
                            error={this.state.addressError!=null ? true :false }
                            className="halfWidth textField"
                            value={this.state.address}
                            type="text"
                            onChange={this.updateaddress}
                            name="address"
                            multiline={true}
                            margin="normal"
                            variant="outlined"
                        />
                         <div className="halfWidth fieldAligment">
                             <Button variant="contained" color="primary" className="buttonSearch noMarginLeft fullWidth" onClick={this.handleCreate}>
                                 Create Member
                            </Button>
                        </div>

                    </div>
                 </Paper>
               </Container>
            
        )
    }
}
const MemberWithData=graphqlDynamic(query,{
    props:({ownProps,mutate})=>({
        createMember:(firstName,lastName,email,gender,phoneNumber,alternateNumber,dob,address)=> mutate({
            variables:{firstName,lastName,email,gender,phoneNumber,alternateNumber,dob,address}
        }) 
    })
})(Member);
export default MemberWithData