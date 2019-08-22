import React from 'react'
import {graphqlDynamic} from 'react-apollo-dynamic-query'
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../css/index.css';
import { Link }from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
const query=props=>{
    return gql` 
    query getNotification{
       notifications: getNotification {
          id
          typeofOperation
          category
          owner {
            id
            username
            email
          }
          impactedId
          createdAt
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
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
      },
      purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
      },
  }));
 function Notification(props) {
    const classes = useStyles();

    let{error,loading,notifications}=props.data;
    if(error) {
        return <div>An Error Occurred</div>
      }
      else if(loading) {
        return <div>Loading</div>
      }
      else
      {
          console.log(notifications);
        const notificationList=notifications.map((notification,index)=>{
            return (<React.Fragment key={notification.id}>
                <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar className={index%2== 0 ? classes.orangeAvatar: classes.purpleAvatar} >{notification.owner.username[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={new Date(notification.createdAt).getDate()+ '-'+ (new Date(notification.createdAt).getMonth() + 1) + '-'+ (new Date(notification.createdAt).getFullYear())}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
               
              </Typography>
              {notification.owner.username} has <strong>{notification.typeofOperation}</strong> a <strong>{notification.category}</strong> {notification.category==="MEMBER" ? <Link to={`/userDetails/${notification.impactedId}`}>Click Here</Link>: <Link to={`/updateUser/${notification.impactedId}`}>Click Here</Link>}  
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </React.Fragment>
            )
        })




    return (
        <Container fixed style={container.searchBox}>
                 <Paper className="paperHeader">
                     <div>Notification
                         </div>
                         <List className={classes.root} style={{maxWidth:"inherit"}}>
                            {notificationList}
                        </List>
                </Paper>
        </Container>
    )
}
}

const NotificationWithData=graphqlDynamic(query,{
    options:(props)=>({
        variables:{id:"not required"}
    })
})(Notification);
export default NotificationWithData