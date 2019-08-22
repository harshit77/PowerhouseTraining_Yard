import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../css/index.css';
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CustomRadioButton from './CustomRadioButton.jsx';
import CustomDatePicker from './CustomDatePicker.jsx';
import DoneIcon from '@material-ui/icons/DoneRounded';
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom'


const query= gql `
    mutation createPackage($name:String!,$memberShipId:String!,$startDate:String!,$endDate:String!,$fees:String!) {
        createPackage(name:$name,memberShipId:$memberShipId,startDate:$startDate,endDate:$endDate,fees:$fees) {
            id
          name
          startDate
        }
      }
    `;

const queryUpdateMember=   gql `
 mutation updateMemberPackage($email:String!,$name:String!$,memberShipId:String!,$startDate:String!,$endDate:String!,$fees:String!,$previousPackageId:String!) {
    updateMemberPackage(email:$email,name:$name,memberShipId:$memberShipId,startDate:$startDate,endDate:$endDate,fees:$fees,previousPackageId:$previousPackageId) {
        id
        }
   }
 `;



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
const filterOptions={
    name:'Package Type',
    typeEnabled:'Gym',
    options:[{
        name:'Gym',
        enabled:true
    },
    {
        name:'Other',
        enabled:false
    }]
}
 class Package extends React.Component {
    constructor(props) {
            super(props);
            this.state={
                filterOptions:filterOptions,
                datePickerLabel:new Date(),
                datePickerLabelEnd:new Date(),
                fees:0,
                endDateError:null,
                feesError:null,
                globalStatus:''
            };
            this.handleFilter=this.handleFilter.bind(this);
            this.handleselectDate=this.handleselectDate.bind(this);
            this.handlePackage=this.handlePackage.bind(this);
            this.handleFees=this.handleFees.bind(this);
    }
    componentDidMount() {
            this.props.option!="Create New Package" ?
            this.setState({
                fees:this.props.dataForPackage.package[this.props.dataForPackage.package.length-1].fees
            }) :null;
    }
    handleFees(event) {
        event.target.value!=0 ?
        this.setState({feesError:null,fees:event.target.value}) :this.setState({feesError:'First Name is required',fees:event.target.value})
    }
   handleselectDate(date,datePicker) {
        console.log(date,datePicker)
        datePicker==="StartDate" ? this.setState({datePickerLabel:date}) :this.setState({datePickerLabelEnd:date,endDateError:null});
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

        this.setState({filterOptions:filteredOptions});
      
    }
    handlePackage() {
        let startDate= new Date(this.state.datePickerLabel);
        let endDate=new Date(this.state.datePickerLabelEnd);
        startDate=startDate.getDate()+ '-'+ (startDate.getMonth() + 1) + '-'+ startDate.getFullYear();
        endDate=endDate.getDate()+ '-'+ (endDate.getMonth() + 1) + '-'+ endDate.getFullYear();
        if(!this.state.fees) this.setState({feesError:'First Name is required'});
        if(startDate==endDate) this.setState({endDateError:'Start and End Date can not be Same'});
         if(!this.state.fees || !this.state.datePickerLabel || !this.state.datePickerLabelEnd  || this.state.endDateError!=null ||this.state.feesError!=null || startDate==endDate) return;
         {this.props.option!="Create New Package" ? 
         this.props.updateMemberPackage({
                variables:{
                    email:this.props.dataForPackage.email,
                    name:this.state.filterOptions.typeEnabled,
                    memberShipId:this.props.dataForPackage.id,
                    startDate:this.state.datePickerLabel,
                    endDate:this.state.datePickerLabelEnd,
                    fees:this.state.fees,
                    previousPackageId:this.props.dataForPackage.package[this.props.dataForPackage.package.length-1].id
        
                }
             }
         ).then(({data})=>{
            console.log("Package updated successfully",data)
            this.setState({ firstName:'',
            fees:'',
            globalStatus:'Package updated successfully'
        });
       
        }).catch(error=>console.log("Error occured",error))
        :
        this.props.createPackage(this.state.filterOptions.typeEnabled,this.props.dataForPackage.id,this.state.datePickerLabel,this.state.datePickerLabelEnd,this.state.fees).then(({data})=>{
            console.log("Package created successfully",data)
            this.setState({ firstName:'',
            fees:'',
            globalStatus:'Package created successfully'
        });
    
        }).catch(error=>console.log("Error occured",error));
    }
    }
    render() {
   console.log(this.state.endDateError);
        return (
            <React.Fragment>
               {this.props.dataForPackage!=null && <Container fixed style={container.searchBox} className="noPaddingmb">
                 <Paper className="paperHeader"  elevation="14">
                     <div>{this.props.option=="Create New Package" ? "Add Package" : "Edit Package"} for 
                     {(this.state.globalStatus=="Package created successfully" || this.state.globalStatus=="Package updated successfully") ? <Link to={`/userDetails/${this.props.dataForPackage.id}`}><strong> {this.props.dataForPackage.firstName} {this.props.dataForPackage.lastName}</strong></Link>: <strong> {this.props.dataForPackage.firstName} {this.props.dataForPackage.lastName}</strong> }
                     {(this.state.globalStatus=="Package created successfully" || this.state.globalStatus=="Package updated successfully") &&  <Chip
                                            icon={<DoneIcon />}
                                            label={this.state.globalStatus}
                                            color="primary"
                                            className="success"
                                        />
                                                 } </div>
                     <div className="fieldAligment">
                        <div style={{marginLeft:10}}>
                            <CustomRadioButton radioSelected={this.handleFilter} radioOption={filterOptions} selected={this.state.filterOptions.typeEnabled} />
                        </div>
                        {this.props.option!="Create New Package" ?  <div className="dateSearchContainer marginLeftText"><span className="messageALert">Previous Start Date : {this.props.dataForPackage.package[this.props.dataForPackage.package.length-1].startDate}</span>
                        <div className="dateBoxSepartor">  </div><span  className="messageALert" style={{marginLeft:'2%'}}>Previous End Date : {this.props.dataForPackage.package[this.props.dataForPackage.package.length-1].endDate}</span></div>
                        :null}
                      
                        <div className="dateSearchContainer marginLeftText marginTopText">
                            <CustomDatePicker labelName="Start Date" className="halfWidth" selectDate={this.handleselectDate} disableFuture={true}/> 
                            <div className="dateBoxSepartor"> To </div>
                            <CustomDatePicker labelName="End Date" className="halfWidth" minDate={this.state.datePickerLabel} disableFuture={false} selectDate={this.handleselectDate}/>
                            {this.state.endDateError!=null ? <div className="error marginLeftText">Start and End Date can not be Same</div> :null} 
                        </div>
                         <TextField
                        error={this.state.feesError!=null ? true :false }
                            id="outlined-fees-input"
                            label="Fees"
                            className="halfWidth textField"
                            type="text"
                            name="lastName"
                            value={this.state.fees}
                            margin="normal"
                            onChange={this.handleFees}
                            variant="outlined"
                        />
                         <div className="halfWidth fieldAligment">
                             <Button variant="contained" color="primary" className="buttonSearch noMarginLeft fullWidth" onClick={this.handlePackage}>
                             {this.props.option!="Create New Package" ?  "Edit Package" :"Add Package"}
                            </Button>
                        </div>

                    </div>
                 </Paper>
               </Container>
        }
           </React.Fragment>
            
        )
    }
}

const PackageWithData=compose(graphql(query,{
    props:({ownProps,mutate})=>({
        createPackage:(name,memberShipId,startDate,endDate,fees)=> mutate({
            variables:{name,memberShipId,startDate,endDate,fees}
        }) 
    })
}),
graphql(queryUpdateMember, { name: 'updateMemberPackage'})
)(Package);
export default PackageWithData;
