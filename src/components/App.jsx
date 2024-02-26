import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}],
    filter: '',
  };
 
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = contacts ? JSON.parse(contacts) : this.state.contacts
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  isNameDuplicate = newName => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === newName.toLowerCase()
    );
  };

  addContact = (contact) => {
    if (this.isNameDuplicate(contact.name)) {
      alert('This name already exists in the phonebook.');
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact]
    }));
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  setFilter = (filterValue) => {
    this.setState({ filter: filterValue });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} contacts={this.state.contacts} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={(e) => this.setFilter(e.target.value)} />
        <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}