import React, { Component } from 'react';
import axios from 'axios';

class Sales extends Component {

    state = {
        products: [],
        pre_sales:[],
        sale: {
            "id" : 0, "name" : "", "product_id" : 0, "quantity" : 0, "price" : 0
        },
        product: {
            "id" : 0, "name" : "", "quantity" : 0, "buy_price" : 0, "sale_price" : 0, "categorie_id" : 0, "owner" : ""
        },
        showAddBtn : false,
        total: 0
    };


    constructor(){
        super();
        this.getProducts();       
    }

    getProducts = async () => {
        await axios.get('http://localhost:5000/products')
        .then((res) => { this.setState({ products: res.data.products }) })
        .catch((error) => { console.log(error) });
        console.log(this.state.products);
    }

    send = async () => {
        await axios.post('http://localhost:5000/add_sale', this.state.pre_sales)
        .then((res) => { 
            console.log(res);
        }).catch((error) => { console.log(error) });   
        this.setState({pre_sales : []});
        this.setState({total : 0});
        this.clearModels();
    }

    handleChangeProduct = (e) => {
        sessionStorage.setItem('product_id', e.target.value);
    }

    getProduct(){
        let pro_id = sessionStorage.getItem('product_id');
        function filtrarPorID(obj) {
            if ('id' in obj && typeof(obj.id) === 'number' && !isNaN(obj.id) && obj.id === Number(pro_id)) return true;
            else return false; 
        }

        let arrPorID = this.state.products.filter(filtrarPorID);
        this.setState({product : arrPorID[0]});
        this.setState({showAddBtn: true});
    }
    
    handleChange = (e) => {
        this.setState(prevState => ({
            sale:{
              ...prevState.product,
              [e.target.name]: e.target.value
            }
          }));
    }
    
    handleClick(productForm){
        this.setState({ product: productForm});
        this.setState({showAddBtn: false});
    }

    add(){
        if (this.state.sale.quantity !== null && this.state.sale.quantity !== undefined && this.state.sale.quantity !== 0) {
            let totalBack = this.state.total;
            let pre_total = this.state.sale.quantity * this.state.sale.sale_price;
    
            let postTotal = totalBack += pre_total;
    
            this.setState({total: postTotal});
    
            let pushed = Array.from(this.state.pre_sales.concat(this.state.sale));
            
            this.setState({ pre_sales: pushed });
            console.log(this.state.pre_sales);
            this.clearModels(); 
        }        
    }

    delete(saleForm){
        for (const iterator of this.state.pre_sales) {
            for (let index = 0; index < this.state.pre_sales.length; index++) {
                const element = this.state.pre_sales[index];
                if (element.id === saleForm.id) {
                    this.state.pre_sales.splice(index, 1);
                    let new_total = this.state.total - (saleForm.quantity * saleForm.sale_price);
                    this.setState({total: new_total});
                }
            }
        }

        let updated = this.state.pre_sales;
        
        this.setState({ pre_sales: updated });
    }

    cancel(){
        this.setState({showAddBtn: false});
        this.clearModels();
    }

    clearModels(){
        this.setState({ product : { "id" : 0, "name" : "", "quantity" : 0, "buy_price" : 0, "sale_price" : 0, "categorie_id" : 0, "owner" : ""  }});
        this.setState({sale : {"id" : 0, "name" : "", "product_id" : 0, "quantity" : 0, "price" : 0}})
    }

    render() {
        return (
            <div className="row">                
                <div className="col-md-12">                
                    <form>
                        <div className="form-row">
                            <datalist id="products">
                                {this.state.products.map((product) => 
                                <option key={product.id} value={product.id}>{product.id} - {product.name}</option>  )}
                            </datalist>
                            <div className="col-md-10">
                                <label htmlFor="productName">Product</label>
                                <input id="productName" name="id" type="text" className="form-control" placeholder="Product" 
                                list="products" onChange={this.handleChangeProduct}/>
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-outline-success" onClick={() => this.getProduct()}>Query</button>
                            </div>
                            
                            <div className="col-md-1">
                                <label htmlFor="productName">#</label>
                                <input id="productName" name="id" type="text" className="form-control"
                                value={this.state.product.id} disabled/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="productName">Product</label>
                                <input id="productName" name="name" type="text" className="form-control"
                                value={this.state.product.name} disabled/>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="productSalePrice">Sale Price</label>
                                <input id="productSalePrice" name="sale_price" type="number" min="0" step="0.01" className="form-control" placeholder="Seal Price" 
                                value={this.state.product.sale_price} disabled/>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="productQuantity">Quantity</label>
                                <input id="productQuantity" name="quantity" type="number" min="0" step="1" className="form-control" placeholder="Quantity"
                                value={this.state.sale.quantity} onChange={this.handleChange}/>
                            </div>
                            

                            <div className="col-md-2">
                                {this.state.showAddBtn ?
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-success" onClick={() => this.add()}>Add</button>
                                    <button type="button" className="btn btn-outline-info" onClick={() => this.cancel()}>Cancel</button>
                                </div>
                                : 
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-success" disabled>Add</button>
                                    <button type="button" className="btn btn-outline-info" disabled>Cancel</button>
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
                            <th scope="col">Total</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pre_sales.map((sale) =>                    
                        <tr>
                            <td>{sale.id}</td>
                            <td>{sale.name}</td>
                            <td>{sale.category}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.buy_price}</td>
                            <td>{sale.sale_price}</td>
                            <td>{sale.owner}</td>
                            <td>{sale.quantity * sale.sale_price}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-small btn-outline-danger" onClick={() => this.delete(sale)}>Delete</button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                    </table>
                    <div className="col-md-6">
                        <label>Total Gral. Venta ${this.state.total}</label>
                    </div>
                    <div className="col-md-6">
                        <button type="button" className="btn btn-outline-warning" onClick={() => this.send()}>Send</button>
                    </div>
                        
                    
                </div>
            </div>
        );
    }
}
export default Sales;