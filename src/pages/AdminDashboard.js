import React from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import ClientsAdminPage from "../components/CliensAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import OrdersAdminPage from "../components/OrdersAdminPage";

function AdminDashboard(){
    return(
       <Container>
        <Tab.Container defaultActiveKey="products">
            <Row>
                <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="products">Products</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="orders">Orders</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="clients">Users</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane  eventKey="products">
                        <DashboardProducts />
                        </Tab.Pane>
                        <Tab.Pane eventKey="orders">
                        <OrdersAdminPage />
                        </Tab.Pane>
                        <Tab.Pane eventKey="clients">
                        <ClientsAdminPage />
                        </Tab.Pane>
                    </Tab.Content>
                    
                </Col>
            </Row>
        </Tab.Container>
       </Container>
    )
}

export default AdminDashboard;