import React, {useState} from 'react';
import Axios from 'axios';

// import regPic from '../images/mapgo_logo.png';
import {NavLink, useNavigate} from "react-router-dom";

const Signup = () =>{

    //user instance for schema
    const [user,setUser] = useState({
        username:"", email:"", phone:"", password:"", cpassword:""
    });

    //function handleInput: sets each value to a user key
    let key, value;
    const handleInputs = (event)=>{
        console.log(event);
        key = event.target.username;
        value = event.target.value;

        setUser({...user, [key]:value})//react hook 
    }

    //function called after submit button

    const navigator = useNavigate();

    const PostData = async (event)=>{
        event.PreventDefault();///idk what this does
  
        const {username, email, phone, password,cpassword} = user;

        //making post request on /register like postman
        const res = await fetch("/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                phone,
                password,
                cpassword
            })
        }).catch((err)=>{
            console.log(err);
        });

        const data = await res.json();

        if(data.status=== 422 || !data){
            window.alert("failed reg");
            console.log("failed registration");
        }
        else{
            window.alert("registration successful");
            console.log("successful regi");
            navigator.push("/login");
        }
    }

   
    return (
        <>
        <form method='POST' action='/register'>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Username</label>
                    <input name='username' type="text" className="form-control" id="exampleInputPassword1" value={user.username} onChange={handleInputs} placeholder='naam kaa hai tumhra'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name='email' type="email" className="form-control" id="exampleInputEmail1" value={user.email} onChange={handleInputs} aria-describedby="emailHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">contact number</label>
                    <input name='phone' type="number" className="form-control" id="exampleInputPassword2" value={user.phone} onChange={handleInputs} placeholder='contact number'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name='password' type="password" className="form-control" id="exampleInputPassword3" value={user.password} onChange={handleInputs}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm your Password</label>
                    <input name='cpassword' type="password" className="form-control" id="exampleInputPassword4" value={user.cpassword} onChange={handleInputs} />
                </div>

                

                {/* <div className="mb-3 form-check">
                    <input value={user.username} onChange={} type="checkbox" className="form-check-input"value={user.username} onChange={}  id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
        <input type="submit" value="submit" onClick={PostData} />
        <div>
            <NavLink to="/login">already registered? go to login page</NavLink>
        </div>
        
        </form> 
        </>
    );
}

export default Signup