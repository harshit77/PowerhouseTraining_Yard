import React,{useState} from 'react'
import {graphqlDynamic} from 'react-apollo-dynamic-query'
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../css/index.css';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core';
import PackageDetails from './PackageDetails.jsx';
import DoneIcon from '@material-ui/icons/DoneRounded';
import {Link}  from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

const query=props=>{
    return gql` 
    query getMember($id:ID!) {
       userDetails:getMember(id:$id) {
          id
          firstName
          lastName
          phoneNumber
          alternateNumber
          DOB
          address
          status
          package {
          name
          startDate
          endDate
          fees
        }
          
        }
      }`
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

function UserDetails(props) {
    let{error,loading,userDetails}=props.data;
    if(error) {
        return <div>An Error Occurred</div>
      }
      else if(loading) {
        return <div><LinearProgress/></div>
      }
      else
      {
          console.log(userDetails);
        return (
            <Container fixed style={container.searchBox}>
                 <Paper className="paperHeader">
                User Status
                
                <span className={userDetails.status==="ACTIVE" ? "activeStatus mblayout marginLeftText": (userDetails.status==="DANGER" ? "dangerStatus mblayout marginLeftText": "deactiveStatus mblayout marginLeftText")}>
                            {userDetails.status}
                        </span>
                    <article style={{display:'flex'}}>
                        <section className="leftListSection">
                            <div> <Avatar alt="Remy Sharp" src="/images/index1.png" className="avatar avatarProfile" /></div>
                            <div className="centerAlign">{userDetails.firstName} {userDetails.lastName}</div>
                        </section>
                        <section className="middleListSection">
                            <div className="subtext"><div className="subtextHeader">Name </div><div className="subTextContent">{userDetails.firstName} {userDetails.lastName}</div></div>
                            {userDetails.package.length!=0 &&
                                <React.Fragment><div className="subtext"><div className="subtextHeader">Plan Start Date </div><div className="subTextContent">{userDetails.package[0].startDate}</div></div>
                                <div className="subtext"><div className="subtextHeader">Plan End Date </div><div className="subTextContent">{userDetails.package[0].endDate}</div></div>
                                </React.Fragment>
                             }
                            <div className="subtext"><div className="subtextHeader">Phone Number </div><div className="subTextContent">{userDetails.phoneNumber}</div></div>
                            <div className="subtext"><div className="subtextHeader">Alternate Number </div><div className="subTextContent">{userDetails.alternateNumber}</div></div>
                            <div className="subtext"><div className="subtextHeader">DOB </div><div className="subTextContent">{new Date(userDetails.DOB).getDate()+ '-'+ (new Date(userDetails.DOB).getMonth() + 1) + '-'+ (new Date(userDetails.DOB).getFullYear())}</div></div>
                            <div className="subtext"><div className="subtextHeader">Address </div><div className="subTextContent">{userDetails.address}</div></div>
                        
                        </section>
                        <section className="hideMb" style={{borderLeft:'none'}}>
                        <Link to={`/updateMember/${userDetails.id}`}>
                            <Button variant="contained" color="primary" className="buttonSearch noMarginLeft fullWidth">
                            Edit
                            </Button>
                            </Link>
                        </section>
                    </article>
                    <section className="displayonlyMb" style={{borderLeft:'none'}}>
                            <Button variant="contained" color="primary" className="buttonSearch noMarginLeft fullWidth">
                                Edit
                            </Button>
                        </section>
                    <Divider style={{marginTop:'20px'}}/>
                    {userDetails.package.length!=0 ? <PackageDetails package={userDetails.package}/> : <div style={{textAlign:'center',fontSize:30}}>No Result Found</div>}
                </Paper>
         </Container>
        )
    }
}
const UserDetailsWithData=graphqlDynamic(query,{
    options:(props)=>({
        variables:{id:props.match.params.userid}
    })
})(UserDetails);

export default UserDetailsWithData;