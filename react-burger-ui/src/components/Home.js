import React, { useState, useEffect } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'
const burgers = require('../burgers.json').map(burger => ({ ...burger }));

function Home() {

  const [orders, setOrders] = useState([])





  useEffect(() => {

    const intervalId = setInterval(() => {
      axios.get('http://localhost:3000/orders')
        .then(function (response) {
          console.log(response.data);
          setOrders(response.data);
        })
    }
      , 2000)


    return () => clearInterval(intervalId); //This is important

  }, [])



  const orderBurger = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const burgerId = e.target.value;
    const burgerArr = burgers.filter(burger => burger.id === burgerId);
    const burger = burgerArr[0];

    axios.post('http://localhost:3000/order', burger)
      .then(function (response) {
        console.log('Order generated - ' + response.data)

      }).catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Container fluid>

      <Row>
        <Col><h4 className="font-weight-normal"> Home </h4></Col>
      </Row>

      <Row>


      </Row>


      {
        burgers.map((burger, idx) => (
          <Card
            bg='light'
            key={idx}
            text='dark'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>{burger.name} at {burger.price} Euros</Card.Header>
            <Card.Body>
              <Card.Title>{burger.name} </Card.Title>
              <Card.Text>
                {burger.description} usually takes {burger.time} mins
              </Card.Text>
            </Card.Body>
            <Button value={burger.id} onClick={orderBurger} variant="primary">Order</Button>
          </Card>
        ))
      }


      <Row>
        <Table hover responsive>
          <thead>
            <tr>
              <th >Order ID</th>
              <th >Burger</th>
              <th >Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order, index) => (
              
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.state}</td>

                <td>

                <ProgressBar animated now={order.progress} />

                </td>



              </tr>
            ))}
          </tbody>
        </Table>



      </Row>









    </Container>

  );
}



export default Home;
