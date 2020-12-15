import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import GasPrices from './components/GasPrices';

import { axiosWithAuth } from './utils/axiosWithAuth';

function App() {
  const logout = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/logout", {
        userToken:localStorage.getItem('token')
      })
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/protected" component={GasPrices} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
