import * as React from 'react';
import routes from "./routes";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <Container className="App">
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">PhoneBook App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/phoneBooks">Phone Book</Nav.Link>
                    <Nav.Link href="/groups">Groups</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Container>
            <Router props={props}>
                <Switch>
                    {routes.map((route, idx) => {
                        return route.component ? (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                component={route.component}
                            />
                        ) : null;
                    })}

                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </Router>
        </Container>
    </Container>
  );
}

export default App;
