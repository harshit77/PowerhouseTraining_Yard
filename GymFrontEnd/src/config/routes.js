import React from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import Home from '../components/Home.jsx';
import HorizontalLinearStepper  from '../components/stepper.jsx';
import Header from '../components/Header.jsx'
import Package from '../components/Package.jsx'
import UserWithData from '../components/User.jsx'
import UserDetailsWithData from '../components/UserDetails.jsx'
import SignWithData from '../components/SignIn.jsx';
import SignUpWithData from '../components/SignUp.jsx';
 import {setContext} from 'apollo-link-context';
 import {isLoggedIn,logout} from './../utils.js';
 import NotificationWithData from '../components/Notification.jsx';
 import UpdateUserWithData from '../components/UpdateUser.jsx';

const httplink=createHttpLink({
  uri:'https://modest-yalow-7daa94.netlify.com/index'
});

const authLink=setContext((_,{headers})=>{
  const token=localStorage.getItem('token');

  return {
    headers:Object.assign({},headers,{Authorization: token ? `Bearer ${token}`:''})
  }

})
const defaulOptions={
  query: {
    fetchPolicy:'cache-and-network',
    errorPolicy:'all'
  }
}

const client=new ApolloClient({
  link:authLink.concat(httplink),
  cache:new InMemoryCache(),
  defaulOptions
})


const routes = (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
          <Switch>
            <Route exact path="/" render={()=> {
            return isLoggedIn() ? <React.Fragment><Header/><Home/></React.Fragment>: <SignWithData/>}
             }/>
            <Route path="/signIn" render={()=>{
              return isLoggedIn() ? <React.Fragment><Header/><Home/></React.Fragment> : <SignWithData/>
            }}/>
            <Route path="/signUp" render={()=>{
              return isLoggedIn() ? <React.Fragment><Header/><Home/></React.Fragment> : <SignUpWithData/>
            }}/>
            <Route path="/createMember"  render={()=>{
            return isLoggedIn() ?  <React.Fragment><Header/><HorizontalLinearStepper/></React.Fragment> : <SignWithData/>}
          }/>
           <Route path="/updateMember/:memberId"  render={(routeProps)=>{
            return isLoggedIn() ?  <React.Fragment><Header/><HorizontalLinearStepper  {...routeProps}/></React.Fragment> : <SignWithData/>}
          }/>

            <Route path="/createPackage"  render={()=> {
              return isLoggedIn() ? <React.Fragment><Header/><Package/></React.Fragment> : <SignWithData/>}
            }/>
            <Route path="/createUser" render={()=> {
              return isLoggedIn() ? <React.Fragment><Header/><UserWithData/></React.Fragment> : <SignWithData/>}
            }/>
             <Route path="/updateUser/:userid"  render={(routeProps)=> {
              return isLoggedIn() ? <React.Fragment><Header/><UpdateUserWithData {...routeProps}/></React.Fragment> :<SignWithData/>}
            }/>
              <Route path="/notification"  render={()=> {
              return isLoggedIn() ? <React.Fragment><Header/><NotificationWithData/></React.Fragment> :<SignWithData/>}
            }/>
            <Route path="/userDetails/:userid"  render={(routeProps)=> {
              return isLoggedIn() ? <React.Fragment><Header/><UserDetailsWithData {...routeProps}/></React.Fragment> :<SignWithData/>}
            }/>
          </Switch>
      </div>
    </BrowserRouter>
    </ApolloProvider>
);

export default routes;
