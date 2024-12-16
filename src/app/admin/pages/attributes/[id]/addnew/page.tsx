// pages/attributes/new.tsx
"use client";
import { useState } from 'react';
import axios from 'axios';
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";


const NewAttributePage = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  // const onSubmit: SubmitHandler<FormData> = async (values) => {

  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
  //   try {
  //     const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(values),
  //     });
  
  //     // Check if the response is successful
  //     if (!response.ok) {
  //       throw new Error('Failed to add category');
  //     }
  
  //     showSuccessToast(result.message || "Category added successfully!");
  //     router.push("/admin/pages/blog_system/category");
  //   } catch (error) {
  //     showErrorToast("Error adding category: " + (error instanceof Error ? error.message : "Unknown error"));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/attributes', { name });
      alert('Attribute has been inserted successfully');
      router.push('/admin/pages/product/attribute');
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
