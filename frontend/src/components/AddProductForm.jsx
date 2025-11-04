import React, {useState, useEffect} from 'react';
import { Plus, X, Edit2, Trash2, Eye, ShoppingBag, Landmark } from 'lucide-react';

const AddProductForm = ({ isOpen, onClose, onSubmit, initialData}) =>{
    const [formData, setFormData] = useState({})
    const[imagePreview, setImagePreview] = useState(null);
    const isEditing = initialData ? true : false;
    useEffect(() => {
        if(isEditing){
            setFormData(initialData);
            setImagePreview(initialData.image);
        }
        else{
            setFormData({});
            setImagePreview(null);
        }
    }, [initialData, isEditing]);
    const handleChange = (e) => { 
        const {name,value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }
    const  handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setFormData(prev => ({...prev, image: file}));
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };
      return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-zinc-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-800">
            <X size={24} />
          </button>
        </div>
        
        {/* Form Body - Styled like your screenshot */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            {/* Product Name */}
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700">Product Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="E.g., Premium Coconut Oil"
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            {/* Product Category */}
            <div className="md:col-span-1">
              <label htmlFor="category" className="block text-sm font-medium text-zinc-700">Product Category*</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                placeholder="E.g., Food & Beverages"
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            
            {/* Price */}
            <div className="md:col-span-1">
              <label htmlFor="price" className="block text-sm font-medium text-zinc-700">Price (₹)*</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="E.g., 250.00"
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            {/* Stock Quantity */}
            <div className="md:col-span-1">
              <label htmlFor="stock" className="block text-sm font-medium text-zinc-700">Stock Quantity*</label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                step="1"
                value={formData.stock || ''}
                onChange={handleChange}
                placeholder="E.g., 50"
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            {/* Product Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-zinc-700">Product Description*</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Details about the product..."
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              ></textarea>
            </div>
            
            {/* Image Upload */}
            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-zinc-700">Product Image</label>
              <div className="mt-1 flex items-center gap-4">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-md object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-400">
                    <ShoppingBag size={32} />
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="block w-full text-sm text-zinc-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-amber-100 file:text-amber-700
                    hover:file:bg-amber-200"
                />
              </div>
            </div>

          </div>

          {/* Form Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-zinc-700 border border-zinc-300 rounded-md shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 text-zinc-900 font-semibold rounded-md shadow-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
            >
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddProductForm;
