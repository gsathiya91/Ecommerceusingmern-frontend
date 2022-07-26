import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";

function DashboardProducts(){
    const products = useSelector(state=>state.products);
    const user = useSelector(state=>state.user);
    const [deleteProduct, {isLoading,isSuccess}] = useDeleteProductMutation();
    const handleDeleteProduct = (id)=>{
     if(window.confirm('Are you sure?')) deleteProduct({product_id: id, user_id: user._id});
    }
    return(
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => 
                <tr>
                   <td>
                    <img src={product.pictures[0].url} className="dashboard-product-preview" />
                   </td>
                   <td>{product._id}</td>
                   <td>{product.name}</td>
                   <td>{product.price}</td>
                   <td>
                   <Link to={`/product/${product._id}/edit`} className="btn btn-warning">Edit</Link>&nbsp;
                    <Button onClick={()=> handleDeleteProduct(product._id, user._id)}  disabled={isLoading}className="btn btn-danger">Delete</Button>
                   </td>
                </tr>
                    )}
            </tbody>
        </Table>
    )
}

export default DashboardProducts;