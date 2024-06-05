// pages/update-product.tsx
import { useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({ product }) => {
    const [formData, setFormData] = useState(product);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${product.id}`, formData);
            alert('Product updated successfully');
        } catch (error) {
            alert('Failed to update product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} />
            <input name="categoryId" value={formData.categoryId} onChange={handleChange} />
            {/* Add other fields similarly */}
            <button type="submit">Update Product</button>
        </form>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    return {
        props: { product: res.data },
    };
}

export default UpdateProduct;
