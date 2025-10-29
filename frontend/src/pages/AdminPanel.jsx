import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AdminProductCard from '../components/AdminProductCard';
import {Plus} from 'lucide-react';
import Products from './Products';

const SAMPLE_PRODUCTS = [
  { id: 1, name: "Coconut Oil", price: 250, stock: 30, status: "Active" },
  { id: 2, name: "Spice Mix", price: 180, stock: 20, status: "Active" },
  { id: 3, name: "Table Runner", price: 450, stock: 5, status: "Draft" },
];

const AdminPanel =()=>{
  const[product,setProduct] = useState([]);
  const[isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setProduct(SAMPLE_PRODUCTS);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are You Sure To Delete This Product?");
    if(confirmDelete) {

      setProduct(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAdd =() => {
    const newProduct = {      id: Date.now(),
      name: "New Product",
      price: 0,
      stock: 0,
      status: "Draft",};
    setProduct(prev=>[newProduct,...prev]);
  };
  return (
  <div className="flex flex-col min-h-screen bg-zinc-100">
    
    <main className="flex-grow max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-800">Admin Dashboard</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-4 py-2 rounded-md"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {isLoading ? (
        <p className="text-zinc-600">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.map((p) => (
            <AdminProductCard key={p.id} product={p} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>


    <Footer />
  </div>
);

};
export default AdminPanel;