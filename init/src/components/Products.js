import React, { Component } from 'react';
import axios from 'axios';

/*
const api = axios.create({
    baseUrl: 'http://127.0.0.1:5000/',
    onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
        console.log('onUploadProgress', progressEvent);
    },
      // `onDownloadProgress` allows handling of progress events for downloads
      // browser only
    onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
        console.log('onUploadProgress', progressEvent);
    }
    
})
*/
class Products extends Component {

    state = {
        products: [],
        categories: [],
        product: {
            "id" : 0, "name" : "", "quantity" : 0, "buy_price" : 0, "sale_price" : 0, "categorie_id" : 0, "owner" : ""
        },
        showAddBtn : true
    };


    constructor(){
        super();
        this.getProducts();
        this.getCategories();        
    }

    getProducts = async () => {
        await axios.get('http://localhost:5000/products')
        .then((res) => { this.setState({ products: res.data.products }) })
        .catch((error) => { console.log(error) });
    }

    getCategories = async () => {
        await axios.get('http://localhost:5000/categories')
        .then((res) => { this.setState({ categories: res.data.categories }) })
        .catch((error) => { console.log(error) });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/add_product', this.state.product)
        .then((res) => {
            this.getProducts();
            this.clearProductModel();
        }).catch((error) => { console.log(error) });     
    }

    handleChange = (e) => {
        this.setState(prevState => ({
            product:{
              ...prevState.product,
              [e.target.name]: e.target.value
            }
          }));
    }
    
    handleClick(productForm){
        this.setState({ product: productForm});
        this.setState({showAddBtn: false});
    }

    update(){
        axios.put('http://localhost:5000/up_product', this.state.product)
        .then((res) => { 
            console.log(res);
            this.getProducts();
            this.setState({showAddBtn: true});
            this.clearProductModel();
        }).catch((error) => { console.log(error) });
    }

    delete(productForm){
        this.setState({ product: productForm});
        axios.post('http://localhost:5000/del_product', this.state.product)
        .then((res) => { 
            this.getProducts();
            this.clearProductModel();
        }).catch((error) => { console.log(error) });
    }

    cancel(){
        this.setState({showAddBtn: true});  
        this.clearProductModel();      
    }

    clearProductModel(){
        this.setState({ product : {
            "id" : 0, "name" : "", "quantity" : 0, "buy_price" : 0, "sale_price" : 0, "categorie_id" : 0, "owner" : ""
        }});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-4">
                                <label htmlFor="productName">Product</label>
                                <input id="productName" name="name" type="text" className="form-control" placeholder="Product" 
                                value={this.state.product.name} onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="productQuantity">Quantity</label>
                                <input id="productQuantity" name="quantity" type="number" min="0" step="1" className="form-control" placeholder="Quantity"
                                value={this.state.product.quantity} onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="productBuyPrice">Buy Price</label>
                                <input id="productBuyPrice" name="buy_price" type="number" min="0" step="0.01" className="form-control" placeholder="Buy Price" 
                                value={this.state.product.buy_price} onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="productSalePrice">Sale Price</label>
                                <input id="productSalePrice" name="sale_price" type="number" min="0" step="0.01" className="form-control" placeholder="Seal Price" 
                                value={this.state.product.sale_price} onChange={this.handleChange}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="categorySelector">Category</label>
                                <select className="form-control" id="categorySelector" name="categorie_id" 
                                value={this.state.product.categorie_id} onChange={this.handleChange}>
                                    {this.state.categories.map((category) => <option value={category.id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="ownerSelector">Owner</label>
                                <select className="form-control" id="ownerSelector" name="owner" 
                                value={this.state.product.owner} onChange={this.handleChange}>
                                    <option value="G">G</option>
                                    <option value="R">R</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                {this.state.showAddBtn ?
                                <button type="submit" className="btn btn-outline-success">Add</button>
                                : 
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-warning" onClick={() => this.update()}>Save</button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => this.cancel()}>Cancel</button>
                                </div> }
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-md-12">
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Buy Prices</th>
                        <th scope="col">Seal Price</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Date</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map((product) => <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td>{product.buy_price}</td>
                        <td>{product.sale_price}</td>
                        <td>{product.owner}</td>
                        <td>{product.date}</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-small btn-outline-warning" onClick={() => this.handleClick(product)}>Update</button>
                                <button type="button" className="btn btn-small btn-outline-danger" onClick={() => this.delete(product)}>Delete</button>
                            </div>
                        </td>
                    </tr>)}
                </tbody>
                </table>
        
                </div>
            </div>
        );
    }
}
export default Products;