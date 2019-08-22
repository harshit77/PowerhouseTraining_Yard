import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import LinearProgress from '@material-ui/core/LinearProgress';
const graphqlQuery=gql`
query getAllMember($id:ID!) {
    customer:getAllMembers(id:$id) {
    firstName
    lastName
    email
    gender
    phoneNumber
    alternateNumber
    DOB
    package {
      name
      startDate
      endDate
    }  
    }
  }
`;


function SearchById(props) {
    let{error,loading,customers}=this.props.data;
    if(error) {
        return <div>An Error Occurred</div>
      }
      else if(loading) {
        return <div><LinearProgress/></div>
      }
      else
      {
    return (
        <div>
            
        </div>
    )
}
}
const SeacrhByIDWithData=graphql(graphqlQuery)(SearchById);

export default SearchById;
