import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AdminItemsPage({ isSidebarOpen }) {  
    const [items, setItems] = useState([]);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!itemsLoaded) {
            fetchItems();
        }
    }, [itemsLoaded]);

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(res.data);
        } catch (err) {
            console.error("Error fetching items:", err);
        } finally {
            setItemsLoaded(true);
        }
    };

    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const token = localStorage.getItem("token");
            axios
                .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => setItemsLoaded(false))
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className={`w-full h-full p-4 transition-all ${isSidebarOpen ? "lg:ml-[250px] md:ml-[200px]" : "ml-0"}`}>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Manage Items</h1>
            
            {/* Loading Spinner */}
            {!itemsLoaded && (
                <div className="flex justify-center items-center my-4">
                    <div className="border-4 border-gray-300 border-t-green-500 rounded-full w-[40px] h-[40px] animate-spin"></div>
                </div>
            )}

            {/* Items Table */}
            {itemsLoaded && items.length > 0 ? (
                <div className="overflow-x-auto w-full max-w-full text-black relative z-10">
                    <table className="w-full min-w-[600px] border border-gray-300 rounded-lg shadow-md bg-white text-xs md:text-sm lg:text-base">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 border">Key</th>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Price</th>
                                <th className="p-3 border">Category</th>
                                <th className="p-3 border hidden md:table-cell">Dimensions</th>
                                <th className="p-3 border">Availability</th>
                                <th className="p-3 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((product, index) => (
                                <tr key={product.key} className={`border ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition-all`}>
                                    <td className="p-3 border">{product.key}</td>
                                    <td className="p-3 border">{product.name}</td>
                                    <td className="p-3 border">${product.price.toFixed(2)}</td>
                                    <td className="p-3 border">{product.category}</td>
                                    <td className="p-3 border hidden md:table-cell">{product.dimensions}</td>
                                    <td className="p-3 border text-center">
                                        <span className={`px-2 py-1 rounded text-xs md:text-sm font-medium ${product.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {product.availability ? "Available" : "Out of Stock"}
                                        </span>
                                    </td>
                                    <td className="p-3 border flex flex-col md:flex-row justify-center items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/items/edit`, { state: product })}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-xs md:text-sm w-full md:w-auto flex items-center justify-center"
                                        >
                                            <FaEdit className="mr-1" /> Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product.key)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs md:text-sm w-full md:w-auto flex items-center justify-center"
                                        >
                                            <FaTrashAlt className="mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                itemsLoaded && (
                    <div className="text-center text-gray-600 mt-6">
                        <p className="text-lg">No items found.</p>
                        <p className="text-sm">Start by adding new items.</p>
                    </div>
                )
            )}

            {/* Floating Add Button */}
            <Link to="/admin/items/add">
                <CiCirclePlus className="fixed bottom-4 right-4 text-green-600 text-6xl hover:text-green-800 transition duration-200 cursor-pointer shadow-lg bg-white rounded-full p-1" />
            </Link>
        </div>
    );
}
