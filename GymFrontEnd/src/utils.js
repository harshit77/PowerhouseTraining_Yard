import jwt_decode from 'jwt-decode';
 
export let isLoggedIn= () =>{
 let authToken= localStorage.getItem('token');
    if(authToken)
    {
     let decode=jwt_decode(authToken);
     console.log(decode.userId);
     return decode.userId;   
    }
}

export let logout=() =>{
    localStorage.removeItem('token');
    window.location.href="/signIn";
}
