import React,{PureComponent} from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./Components/Common/NavBar/NavBar"
import Login from "./Components/Auth/Login"
import Dashboard from "./Components/Todos/Dashboard"
class App extends  PureComponent{
  render(){
    return(
      <>
        <Router>
          <Switch>
            {/* <Route path={`/login`} component={Login} /> */}
            <Route path="/" render={(props)=>
             ( localStorage.getItem("type") === "admin@123" ||localStorage.getItem("type") === "user") ?
            (<Dashboard {...props} />):(<>
                  <NavBar />
                  <Login {...props}/>
            </>)} />
            <Redirect to={`/login`} />
          </Switch>
        </Router>
      </>
    )
  }
}
export default App;