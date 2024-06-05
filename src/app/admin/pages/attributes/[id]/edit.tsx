// pages/attributes/[id]/edit.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditAttributePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [lang, setLang] = useState('en');

  useEffect(() => {
    if (id) {
      axios.get(`/api/attributes/${id}`)
        .then(response => {
          const { name } = response.data.attribute;
          setName(name);
        })
        .catch(error => {
          console.error('Error fetching attribute:', error);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/attributes/${id}`, { name, lang });
      alert('Attribute has been updated successfully');
      router.push('/attributes');
    } catch (error) {
      console.error('Error updating attribute:', error);
      alert('Failed to update attribute');
    }
  };

  return (
    <div>
      <h1>Edit Attribute</h1>
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
        <div>
          <label htmlFor="lang">Language</label>
          <select id="lang" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            {/* Add options for other languages */}
          </select>
        </div>
        <button type="submit">Update Attribute</button>
      </form>
    </div>
  );
};

export default EditAttributePage;
