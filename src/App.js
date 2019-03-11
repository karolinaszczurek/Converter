import React, {Component} from 'react';
import './App.css';

function isNumber(value) {
    return parseInt(value) == value;
}

class App extends Component {
    state = {
        form: {
            from: '',
            to: '',
            value: '',
        },
        result: '',
        errors: {
            from: '',
            to: '',
            value: '',
        },
    };

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const form = this.state.form;
        form[name] = value;
        this.setState({form: form}); //update top level w state
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({result: ''});

        if (this.validate()) {
            const result = this.convert(this.state.form.from, this.state.form.to, this.state.form.value);
            this.setState({result: result});
        }

    };

    convert(from, to, value) {
        return parseInt(value, from).toString(to);
    }

    validate = () => {
        const errors = {};
        const {from, to, value} = this.state.form; //assign

        if (!isNumber(from)) {
            errors['from'] = 'This must be a number'
        } else if (from > 36 || from < 2) {
            errors['from'] = 'Radix must be between 2 and 36'
        } else {
            errors['from'] = ''
        }

        if (!isNumber(to)) {
            errors['to'] = 'This must be a number'
        } else if (to > 36 || to < 2) {
            errors['to'] = 'Radix must be between 2 and 36'
        } else {
            errors['to'] = ''
        }


        // if (isNaN(value)){
        //     errors['value'] = 'Wrong value'
        // } else {
        //     errors['value'] = ''
        // }

        this.setState({errors: errors});

        for (const key in errors) {
            if (errors[key] !== '') {
                return false;
            }
        }
        return true;
    };

    render() {
        return (
            <div className='main-container'>
                <h1>Numerical system converter</h1>
                <div className='app-container'>
                    <form className='main-form' onSubmit={this.handleSubmit}>
                        <label className='inputs-label' htmlFor="from"> From</label>
                        <input id="from" type="text" name="from" onChange={this.handleChange}/>
                        <div className='error-container'>
                            <span style={{color: "red"}}> {this.state.errors.from}</span>
                        </div>
                        <label htmlFor="to">To</label>
                        <input id="to" type="text" name="to" onChange={this.handleChange}/>
                        <div className='error-container'>
                            <span style={{color: "red"}}> {this.state.errors.to}</span>
                        </div>
                        <label htmlFor="value">Value</label>
                        <input id="value" type="text" name="value" onChange={this.handleChange}/>
                        <div className='error-container'>
                            <span style={{color: "red"}}> {this.state.errors.value}</span>
                        </div>
                        <button type="submit">Convert</button>
                    </form>
                </div>
                <div className='result-container'>
                    <span><strong>{this.state.result}</strong></span>
                </div>
            </div>
        );
    }
}

export default App;
