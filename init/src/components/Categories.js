import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {

    state = {
        categories: [],
        category: { "id" : 0, "name" : "" },
        showAddBtn : true
    };


    constructor(){
        super();
        this.getCategories();        
    }

    getCategories = async () => {
        await axios.get('http://localhost:5000/categories')
        .then((res) => { this.setState({ categories: res.data.categories }) })
        .catch((error) => { console.log(error) });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/add_category', this.state.category)
        .then((res) => { 
            console.log(res);
            this.getCategories();
        }).catch((error) => { console.log(error) });     
    }

    handleChange = (e) => {
        this.setState(prevState => ({
            category:{
              ...prevState.category,
              [e.target.name]: e.target.value
            }
          }));
    }
    
    handleClick(categoryForm){
        this.setState({ category: categoryForm});
        this.setState({showAddBtn: false});
    }

    update(){
        axios.put('http://localhost:5000/up_category', this.state.category)
        .then((res) => { 
            this.getCategories();
            this.setState({showAddBtn: true});
            this.setState({ category : { "id" : 0, "name" : "" }})
        }).catch((error) => { console.log(error) });
    }

    delete(categoryForm){
        console.log(categoryForm);
        this.setState({ category: categoryForm});
        axios.post('http://localhost:5000/del_category', categoryForm)
        .then((res) => {
            this.getCategories();
            this.setState({ category : { "id" : 0, "name" : "" }})
        }).catch((error) => { console.log(error) });
    }

    cancel(){
        this.setState({showAddBtn: true});
        this.setState({ category : { "id" : 0, "name" : "" }})
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-8">
                                <label htmlFor="productName">Category</label>
                                <input id="productName" name="name" type="text" className="form-control" placeholder="Product" 
                                value={this.state.category.name} onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-4">
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
                        <th scope="col">Category</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.categories.map((category) => <tr>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-small btn-outline-warning" onClick={() => this.handleClick(category)}>Update</button>
                                <button type="button" className="btn btn-small btn-outline-danger" onClick={() => this.delete(category)}>Delete</button>
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
export default Categories;