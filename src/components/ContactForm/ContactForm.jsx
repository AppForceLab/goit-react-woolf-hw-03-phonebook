import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './ContactForm.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  validateName = name => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+([' -]?[a-zA-Zа-яА-Я ]+)*$/;
    return nameRegex.test(name);
  };

  validateNumber = number => {
    const numberRegex = /^\+?\d{1,4}?([-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}){1,2}([-.\s]?\d{1,9})?$/;
    return numberRegex.test(number);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (!this.validateName(name)) {
      alert('Please enter a valid name. Name may contain only letters, apostrophe, dash and spaces.');
      return;
    }
    if (!this.validateNumber(number)) {
      alert('Please enter a valid phone number. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +');
      return;
    }

    this.props.onAdd({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={this.handleChange}
          placeholder="Enter name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <input
          type="tel"
          name="number"
          required
          value={number}
          onChange={this.handleChange}
          placeholder="Enter phone number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
