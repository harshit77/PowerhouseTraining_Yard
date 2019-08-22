import React from 'react';
//import {graphql} from 'react-apollo';
import {graphqlDynamic} from 'react-apollo-dynamic-query'
import gql from 'graphql-tag';
import SearchList from './SearchList.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const query= props =>{
    console.log(props.typeWithValue.name)
    return props.typeWithValue.name==="ALL"  ?
     gql`
    query getAllMembers {
        customers:getAllMembers {
        id
        firstName
        lastName
        email
        gender
        phoneNumber
        alternateNumber
        DOB
        status
        package {
          name
          startDate
          endDate
        }  
        }
      }
      `: (props.typeWithValue.name==="Contain" ?
      gql` query getMemberBySearch($name:String!) {
        customers:getMemberBySearch(name:$name) {
        id
        firstName
        lastName
        email
        gender
        phoneNumber
        alternateNumber
        DOB
        status
        package {
          name
          startDate
          endDate
        }  
        }
      }`
      :
      gql` query getMemberByDate($name:String!) {
        customers:getMemberByDate(name:$name) {
        id
        firstName
        lastName
        email
        gender
        phoneNumber
        alternateNumber
        DOB
        status
        package {
          name
          startDate
          endDate
        }  
        }
      }`
    )
}

function AllMember(props) {
    console.log("csdbkajcbjdksc",props.data);
    
    let{error,loading,customers}=props.data;
    if(error) {
        return <div>An Error Occurred</div>
      }
      else if(loading) {
        return <div><LinearProgress/></div>
      }
      else
      {
          console.log(customers);
        return (
            <div>
                <SearchList customers={customers}/>
            </div>
        )
    }
}
const AllMemberWithData=graphqlDynamic(query,{
    options:(props)=>({
        variables:{name:props.typeWithValue.value}
    })
})(AllMember);
export default AllMemberWithData;