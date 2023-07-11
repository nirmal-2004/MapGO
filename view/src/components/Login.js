import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () =>{
    return (
        <>
          <form method='POST' action='/login'>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Username</label>
                    <input name='username' type="text" className="form-control" id="username"   placeholder='Your Name'/>
                </div>

                


                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name='password' type="password" className="form-control" id="password" />
                </div>
        <input type="submit" value="submit" />
        
        
        </form> 
        </>
    );
}

export default Login