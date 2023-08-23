import React from "react";
import {Redirect} from 'react-router-dom';

const Signin = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [result, setResult] = React.useState();

    const handleSignIn = () => {
        console.log('User Signed In.', username, password);
        const body ={
            username: username,
            password: password,
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body),
        };
        fetch('/api/sign-in', settings)
        .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.isSuccess){
                    setResult(true); 
                }else{
                    setResult(data.error);
                }
            })
            .catch(console.log);
    };

    if(result === true) {
         return <Redirect to= {{
         pathname: "./Transaction",
         state: {username :username}
         }}
         />
    }

   


    return(
        <div className = "signIn-box">
            <h1>Sign In</h1>

            <div className = "signIn-box2">

                <div className = "signIn-textfield">
                        <lable>Username</lable>
                        <input value = {username} onChange={(e) => setUsername(e.target.value)}>
                        </input>
                        
                </div>
                <div className = "signIn-textfield">
                        <lable>Password</lable>
                        <input value = {password} onChange= {(e) => setPassword(e.target.value)} type="password"></input> 
                </div>

                <div className="signIn-button">
                <a data-switcher data-tab="3" button onClick = {handleSignIn}><button>
                Sign In</button></a>
                </div>

            </div>
        </div>
    );
};

export default Signin;