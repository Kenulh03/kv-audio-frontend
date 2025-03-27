import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminUsersPage from "./adminUsersPage";

export default function AdminPage() {
  const [userCount, setUserCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/count`)
      .then((res) => setUserCount(res.data.count))
      .catch((err) => console.error("Failed to fetch user count", err));
  }, []);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/products/count`)
      .then((res) => {
        console.log("Item Count Response:", res.data);
        setItemCount(res.data.count);
      })
      .catch((err) => console.error("Failed to fetch item count", err));
  }, []);

  useEffect(() => {
    axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/count`)
      .then((res) => {
        setPendingOrders(res.data);
      })
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row text-white">
      {/* Sidebar Toggle Button */}
      <div className="w-full p-4 bg-accent text-white flex justify-between md:hidden">
        <button onClick={() => setIsSidebarOpen(true)}>☰</button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-[250px] h-full bg-accent p-6 flex flex-col shadow-lg fixed md:relative transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Button */}
        <button
          className="md:hidden p-4 text-white self-end"
          onClick={() => setIsSidebarOpen(false)}
        >
          <AiOutlineClose size={24} />
        </button>

        <nav className="flex flex-col space-y-4 mt-8 md:mt-0">
          <Link
            to="/admin"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
          >
            <BsGraphDown />
            <span className="text-lg">Dashboard</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
          >
            <FaRegBookmark className="text-xl" />
            <span className="text-lg">Orders</span>
          </Link>
          <Link
            to="/admin/items"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
          >
            <MdOutlineSpeaker className="text-xl" />
            <span className="text-lg">Items</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
          >
            <FaRegUser className="text-xl" />
            <span className="text-lg">Users</span>
          </Link>
          {token && (
            <button
              className="text-lg mt-6 p-3 bg-red-500 rounded-lg hover:bg-red-700"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {location.pathname === "/admin" && (
          <>
            <h2 className="text-3xl text-black font-semibold mb-6">
              Welcome to the Admin Dashboard
            </h2>
            <p className="text-lg text-black mb-4">
              Here you can manage all aspects of your audio rental system,
              including orders, items, and users.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Available Items</h3>
                <p className="text-2xl font-bold">{itemCount}</p>
              </div>
              <div className="bg-accent p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Registered Users</h3>
                <p className="text-2xl font-bold">{userCount}</p>
              </div>
              <div className="bg-accent p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
            </div>
          </>
        )}
        <Routes>
          <Route path="/orders" element={<AdminOrdersPage />} />
          <Route path="/items" element={<AdminItemsPage />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/items/add" element={<AddItemPage />} />
          <Route path="/items/edit" element={<UpdateItemPage />} />
        </Routes>
      </div>
    </div>
  );
}
