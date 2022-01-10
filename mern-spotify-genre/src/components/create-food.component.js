import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateFood extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            price: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const food = {
            username: this.state.username,
            description: this.state.description,
            price: this.state.price,
            date: this.state.date,
        }

        console.log(food);

        axios.post('http://localhost:5000/food/add', food)
            .then(res => console.log(res.data));
        
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Add a new food</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput">
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type = "text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type = "text"
                            required
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <input type = "submit" value = "Add a new food" className = "btn btn-primary" />
                    </div>
                </form>
            </div>

        )
    }
}