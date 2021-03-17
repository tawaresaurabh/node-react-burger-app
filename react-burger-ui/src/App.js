import React from 'react';

import Home from './components/Home'

import List from './components/List'
import Footer from './components/Footer'

import Navigation from './components/Navigation';
import Contact from './components/Contact';
import Container from 'react-bootstrap/Container';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Router>    
    <Container fluid>
    <Navigation></Navigation>
    
    <Switch>
    <Route path="/" exact component={Home}></Route>
    
    <Route path="/list" component={List}></Route>
    <Route path="/contact" component={Contact}></Route>    
    </Switch>
    <Footer></Footer>
    
    
    
    </Container>    
    </Router>
    
   
  );
}



export default App;
