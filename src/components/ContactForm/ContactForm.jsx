import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './ContactForm.css';

const ContactForm = ({ onAdd, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const validateName = name => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+([' -]?[a-zA-Zа-яА-Я ]+)*$/;
    return nameRegex.test(name);
  };

  const validateNumber = number => {
    const numberRegex =
      /^\+?\d{1,4}?([-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}){1,2}([-.\s]?\d{1,9})?$/;
    return numberRegex.test(number);
  };

  const isNameDuplicate = newName => {
    return contacts.some(
      contact => contact.name.toLowerCase() === newName.toLowerCase()
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateName(name)) {
      alert(
        'Please enter a valid name. Name may contain only letters, apostrophe, dash and spaces.'
      );
      return;
    }
    if (!validateNumber(number)) {
      alert(
        'Please enter a valid phone number. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
      return;
    }
    if (isNameDuplicate(name)) {
      alert('This name already exists in the phonebook.');
      return;
    }

    onAdd({ id: nanoid(), name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
      <input
        type="tel"
        name="number"
        required
        value={number}
        onChange={e => setNumber(e.target.value)}
        placeholder="Enter phone number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
