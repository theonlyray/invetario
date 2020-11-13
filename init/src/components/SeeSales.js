import React, { Component } from 'react';
import axios from 'axios';

class SeeSales extends Component {

    state = {
        sales:[],
        sale: { "id" : 0, "name" : "", "product_id" : 0, "quantity" : 0, "price" : 0 },
        dates: { date_f:'', date_l:'' },
        totalGral : 0,
        utility : 0,
        inversion: 0
    };


    constructor(){
        super();     
    }

    handleChange = (e) => {
        this.setState(prevState => ({
            dates:{
              ...prevState.dates,
              [e.target.name]: e.target.value
            }
        }));
    }

    handleSubmit = async (e) => {
        let totalGral = 0, utility = 0, inversion = 0;
        e.preventDefault();
        await axios.post('http://localhost:5000/salesBetweenDate', this.state.dates)
        .then((res) => { 
            this.setState({ sales: res.data.sales });
            for (const iterator of res.data.sales) {
                for (const key in iterator) {
                    if (key === 'buy_price') inversion += iterator[key] * iterator['quantity_sale'];
                    if (key === 'price_sale') totalGral += iterator[key] * iterator['quantity_sale'];
                }  
            }
            utility = totalGral - inversion;
            this.setState({totalGral : totalGral});
            this.setState({utility : utility});
            this.setState({inversion : inversion});
        })
        .catch((error) => { console.log(error) });     
        console.log(this.state.sales);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">From</label>
                            <div className="col-sm-3">
                                <input name="date_f" type="date" className="form-control" id="staticEmail" 
                                value={this.state.dates.date_f} onChange={this.handleChange}/>
                            </div>
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">To</label>
                            <div className="col-sm-3">
                                <input name="date_l" type="date" className="form-control" id="inputPassword" 
                                value={this.state.dates.date_l} onChange={this.handleChange}/>
                            </div>
                            <div className="col-sm-1">
                                <button type="subtmit" className="btn btn-outline-success">Query</button>
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
                        <th scope="col">Date</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Buy Prices</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Seal Price</th>
                        <th scope="col">Total Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales.map((sale) =>                    
                    <tr>
                        <td>{sale.id_sale}</td>
                        <td>{sale.product}</td>
                        <td>{sale.date_sale}</td>
                        <td>{sale.owner}</td>
                        <td>{sale.buy_price}</td>
                        <td>{sale.quantity_sale}</td>
                        <td>{sale.sale_price}</td>
                        
                        <td>{sale.quantity_sale * sale.sale_price}</td>
                    </tr>)}
                </tbody>
                </table>                
                    <p>Total Gral. Seals ${this.state.totalGral}</p>
                    <p>Inversion ${this.state.inversion}</p>
                    <p>Utility ${this.state.utility}</p>                    
                </div>            
            </div>
                
        );
    }
}
export default SeeSales;