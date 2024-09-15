import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactForm = ({ onContactAdded, onContactUpdated, editingContact, setEditingContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
    }
  }, [editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingContact) {
        const response = await axios.put(`http://localhost:5000/api/contacts/${editingContact._id}`, { name, phone }, {
          headers: { 'x-auth-token': token }
        });
        onContactUpdated(response.data);
        setEditingContact(null);
        toast.success('Contact updated successfully');
      } else {
        const response = await axios.post('http://localhost:5000/api/contacts', { name, phone }, {
          headers: { 'x-auth-token': token }
        });
        onContactAdded(response.data);
        toast.success('Contact added successfully');
      }
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error adding/updating contact:', error);
      toast.error('Error adding/updating contact');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        {editingContact ? 'Update Contact' : 'Add Contact'}
      </button>
      {editingContact && (
        <button
          type="button"
          onClick={() => {
            setEditingContact(null);
            setName('');
            setPhone('');
          }}
          className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default ContactForm;