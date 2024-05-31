import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../../components/common/PageTitle";

class StoreOrders extends React.Component 
{

  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListOne: []
    };
  }
  
  componentDidMount() {

    fetch('http://localhost:4000/api/v1/orderproduct')
    .then((response) => response.json())
    .then(orderList => {
        this.setState({ PostsListOne: orderList });
        console.log(orderList);
    });

  }

  ChangePending(orderID) {

    var productdata = {               
      "OrderStatus": "Delivered"    
    };

    fetch('http://localhost:4000/api/v1/order/'+orderID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productdata)
    })
    .then(response => response.json())
    .then(data => {
      alert('Order Delivered');      
      this.componentDidMount();
    })
    .catch(error => {
      console.error('Error updating Doctor record:', error);
    });
  }

  ChangeDelivered(orderID) {

    var productdata = {               
      "OrderStatus": "Pending"    
    };

    fetch('http://localhost:4000/api/v1/order/'+orderID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productdata)
    })
    .then(response => response.json())
    .then(data => {
      alert('Order Pending');      
      this.componentDidMount();
    })
    .catch(error => {
      console.error('Error updating Doctor record:', error);
    });
  }

  OrderRejected(orderID) {

    var productdata = {               
      "OrderStatus": "Rejected"    
    };

    fetch('http://localhost:4000/api/v1/order/'+orderID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productdata)
    })
    .then(response => response.json())
    .then(data => {
      alert('Order Rejected');      
      this.componentDidMount();
    })
    .catch(error => {
      console.error('Error updating Doctor record:', error);
    });
  }

  render()
  {    
    const { PostsListOne } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Orders" subtitle="Store" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Orders</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Product ID
                      </th>
                      <th scope="col" className="border-0">
                        Qty
                      </th>
                      <th scope="col" className="border-0">
                        Amount
                      </th>
                      <th scope="col" className="border-0">
                        Order ID
                      </th>
                      <th scope="col" className="border-0">
                        Pet Owner ID
                      </th>
                      <th scope="col" className="border-0">
                        Date
                      </th>
                      <th scope="col" className="border-0">
                        Pick-Up Method
                      </th>
                      <th scope="col" className="border-0">
                        Payment Method
                      </th>
                      <th scope="col" className="border-0">
                        Order Status
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    PostsListOne.map((post, idx) => (          
                      <tr key={post._id}>
                        <td>{post.ProductID.ProductName}</td>
                        <td>{post.Qty}</td>
                        <td>Rs {post.Amount}</td>
                        <td>{post.OrderID._id}</td>
                        <td>{post.OrderID.PetOwnerID}</td>
                        <td>{post.OrderID.OrderDate}</td>
                        <td>
                          <Row form>              
                              <Col md="12" className="mb-3">                                 
                                  {post.OrderID.PickupMethod === "Pick-Up" ? <Button theme="warning">Pick-Up</Button> : <Button theme="primary">Delivery</Button>}
                              </Col>
                          </Row>          
                        </td>
                        <td>
                          <Row form>              
                              <Col md="12" className="mb-3">                                 
                                  {post.OrderID.PaymentMethod === "Cash" ? <Button theme="success">Cash</Button> : <Button theme="info">Card</Button>}
                              </Col>
                          </Row>          
                        </td>
                        <td>
                          <Row form>              
                              <Col md="12" className="mb-3">   
                                  {post.OrderID.OrderStatus === "Pending" ? <Button theme="dark"  onClick={() => this.ChangePending(post.OrderID._id)} >Preparing</Button> : post.OrderID.OrderStatus === "Rejected" ? <Button theme="dark" onClick={() => this.ChangeDelivered(post.OrderID._id)}>Rejected</Button> : <Button theme="primary" onClick={() => this.ChangeDelivered(post.OrderID._id)}>Delivered</Button>}
                              </Col>
                          </Row>          
                        </td>
                        <td>
                          <Row form>              
                              <Col md="12" className="mb-3">   
                                  {post.OrderID.OrderStatus === "Rejected" ? <Button theme="dark" onClick={() => this.ChangeDelivered(post.OrderID._id)}>Rejected</Button> : <Button theme="danger" onClick={() => this.OrderRejected(post.OrderID._id)}>X</Button>}
                              </Col>
                          </Row>          
                        </td>
                      </tr>
                    ))
                    }                 
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
};

export default StoreOrders;
