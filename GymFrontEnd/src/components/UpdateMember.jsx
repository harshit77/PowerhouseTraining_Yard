import React from 'react';
import {graphqlDynamic} from 'react-apollo-dynamic-query'
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CustomRadioButton from './CustomRadioButton.jsx';
import Button from '@material-ui/core/Button';
import PackageWithData from './Package.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const query= props =>{
    return gql `
    query getMember($id:ID!) {
        memberDetails:getMember(id:$id) {
                id
                firstName
                lastName
                email
                gender
                phoneNumber
                alternateNumber
                package {
                    id
                    startDate
                    endDate
                    fees
                }
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
const filterOptions={
    name:'',
    typeEnabled:'Edit Current Package',
    options:[{
        name:'Edit Current Package',
        enabled:true
    },
    {
        name:'Create New Package',
        enabled:false
    }]
}

class UpdateMember extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            filterOptions:filterOptions,
            globalStatus:'',
            next:false
        }
        this.handleFilter=this.handleFilter.bind(this);
        this.handleOperation= this.handleOperation.bind(this);
    }
    handleOperation () {
        this.setState({next:true})
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
    render() {
        let{error,loading,memberDetails}=this.props.data;
        if(error) {
            return <div>An Error Occurred</div>
          }
          else if(loading) {
            return <div> <LinearProgress /></div>
          }
          else
          {
              console.log(memberDetails,this.state.filterOptions.typeEnabled);
            return (
                    <Container fixed style={container.searchBox} className="noPaddingmb">
                        {this.state.next===false ? <React.Fragment>
                        Select Option for  <strong>{memberDetails.firstName} {memberDetails.lastName}</strong>
                        <div className="marginTopText">
                        <div style={{marginLeft:-10}}>
                            <CustomRadioButton radioSelected={this.handleFilter} radioOption={filterOptions} selected={this.state.filterOptions.typeEnabled} />
                        </div>
                          <div className="halfWidth marginTopText">
                            <Button variant="contained" color="primary" className="buttonSearch noMarginLeft fullWidth" onClick={this.handleOperation}>
                                    Next
                            </Button>
                            </div>
                        </div>
                        </React.Fragment>
                        :
                       
                            <PackageWithData dataForPackage={memberDetails} option={this.state.filterOptions.typeEnabled}/>
                   
                        }
                      </Container>
            )
    }
}
}




const UpdateMemberWithData=graphqlDynamic(query,{
    options:(props)=>{
        console.log("cdjnascbhjdsvjh",props);
        return {
        variables:{id:props.id}
    }}
})(UpdateMember);
export default UpdateMemberWithData;