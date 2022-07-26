import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from '../axios';
import Loading from './Loading';

function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector(state => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const markShipped = (orderId, ownerId) => {
        axios.patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }

    const showOrder = (productsObj) => {
        let productToShow = products.filter((product) => productsObj[product._id]);
        productToShow = productToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy
        })
        setShow(true);
        setOrderToShow(productToShow);
    }

    useEffect(() => {
        setLoading(true);
        axios.get('/orders')
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Loading />
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">No orders yet</h1>
    }

    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Total</th>
                        <th>Address</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, i) => (

                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{order.owner?.name}</td>
                            <td>{order.date}</td>
                            <td>{order.count}</td>
                            <td>{order.total}</td>
                            <td>{order.address}</td>
                            <td>
                                {order.status === "processing" ? (
                                    <Button size="sm" onClick={() => markShipped(order._id, order.owner?._id)}>
                                        Mark as shipped
                                    </Button>
                                ) : (
                                    <Badge bg="success">Shipped</Badge>
                                )}
                            </td>
                            <td>
                                <span style={{ cursor: "pointer" }} onClick={() => showOrder(order.products)}
                                >View order <i className="fa fa-eye" /></span>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                {orderToShow.map(order => (
                    <div className="order-detail-container d-flex justify-content-around py-2">
                        <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} />
                        <p>
                            <span>{order.count} x</span>{order.name}
                        </p>
                        <p>Price: ₹ {Number(order.price) * order.count}</p>
                    </div>
                ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default OrdersAdminPage;