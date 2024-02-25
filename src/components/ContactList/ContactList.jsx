import ContactListItem from '../ContactListItem/ContactListItem';
import './ContactList.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ContactList;
