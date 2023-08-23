import './App.css';
import './index.css';
import {Link, Switch, Route} from 'react-router-dom';
import React from 'react';

import Signin from './Signin';
import Signup from './Signup';
import Transaction from './Transaction';
import Contact from './Contact';

function App() {
  return (
    <body>
    <header>
      <nav>
        <h1>Lasagna Payment</h1>
        <ul class="tabs">  
          <li class="tab">
            <a data-switcher data-tab="2"><Link to ="/">
            Home</Link></a>
          </li>
          <li class="tab">
            <a data-switcher data-tab="2"><Link to ="/sign-in">
            Sign in</Link></a>
          </li>
          <li class="tab">
            <a data-switcher data-tab="2"><Link to ="/sign-up">
            Sign up</Link></a>
          </li>
          {/* <li class="tab">
            <a data-switcher data-tab="3"><Link to = "/transaction">
            Transaction</Link></a>
          </li> */}
          {/* <li class="tab">
            <a data-switcher data-tab="4"><Link to = "/contact">
              Contact</Link></a>
          </li> */}
        </ul>
        
      </nav>

    <Switch>
      <Route path = "/sign-in"><Signin/></Route>
      <Route path = "/sign-up"><Signup/></Route>
      
      <Route path = "/transaction"><Transaction/></Route>
      <Route path = "/contact"><Contact/></Route>
    </Switch>
    </header>
    <div className='footer'>
    <div>This is a 413 Group Project</div>
    Made by Juan, Kate Vu, Tay Truong, Nyan Lin, Kinnek
    </div>
   </body> 
  );
}

export default App;
