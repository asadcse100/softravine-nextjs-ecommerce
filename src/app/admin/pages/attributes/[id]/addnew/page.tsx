// pages/attributes/new.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewAttributePage = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/attributes', { name });
      alert('Attribute has been inserted successfully');
      router.push('/attributes');
    } catch (error) {
      console.error('Error creating attribute:', error);
      alert('Failed to create attribute');
    }
  };

  return (
    <div>
      <h1>Create New Attribute</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Attribute</button>
      </form>
    </div>
  );
};

export default NewAttributePage;
