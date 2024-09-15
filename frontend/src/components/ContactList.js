import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactList = ({ contacts, setContacts, setEditingContact }) => {
  const deleteContact = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setContacts(contacts.filter(contact => contact._id !== id));
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Error deleting contact');
    }
  };

  return (
    <ul className="divide-y divide-gray-200">
      {contacts.map((contact) => (
        <li key={contact._id} className="py-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">{contact.name}</h3>
            <p className="text-gray-600">{contact.phone}</p>
          </div>
          <div>
            <button
              onClick={() => setEditingContact(contact)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteContact(contact._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;