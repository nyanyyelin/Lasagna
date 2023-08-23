import React from "react";
import {Redirect} from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword,setConfirmPassword] = React.useState('');
    const [result, setResult] = React.useState(null);

    const handleSignUp = () => {
    console.log('Sign Up Clicked', username, password, email);
        
    if(password === confirmPassword) {
        const body ={
            username: username,
            password: password,
            confirmPassword : confirmPassword,
            email: email,
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body),
        };
        fetch('/api/sign-up', settings)
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
        } else {
            alert("Password don't match")
        }
    };
    


    if(result === true){
        // return(
        //     <div>Welcome {username}</div>
        //     return <Redirect to='./Transaction' />
        // );

        return <Redirect to='./Transaction' />
    }

    return(
    <div className = "signIn-box">
        <h1>Sign Up</h1>

        <div className = "signIn-box2">

            <div className = "signIn-textfield">
                <label>Username</label>
                <input value = {username} onChange={(e) => setUsername(e.target.value)}>
                </input>      
            </div>

            <div className="signIn-textfield">
                <label>Email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type ="email"></input>
            </div>

            <div className = "signIn-textfield">
                    <label>Password</label>
                    <input value = {password} onChange= {(e) => setPassword(e.target.value)} type="password"></input> 
            </div>
            <div className = "signIn-textfield">
                    <label>Confirm Password</label>
                    <input value = {confirmPassword} onChange= {(e) => setConfirmPassword(e.target.value)} type="password"></input> 
            </div>

            <div className = "signIn-button">
                    <button onClick = {handleSignUp}> Sign Up</button>
            </div>
        </div>
    </div>
    );
};
export default Signup;