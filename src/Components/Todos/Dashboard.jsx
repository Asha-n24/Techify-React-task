import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodosList from "./TodosList"
import SideBar from "../Common/SideBar/SideBar"

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div>
                    <SideBar />
                    <Switch>
                        <Route path="/todos/" exact component={TodosList} />
                    </Switch>
                </div>

            </div>
        );
    }
}

export default Dashboard;