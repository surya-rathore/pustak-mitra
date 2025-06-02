import React, { useState, useEffect } from "react";
import AddBook from "./Addbooks";
import axios from "axios";

const Admin_dashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [OrderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const countBook = async () => {
      try {
        const res = await axios.get("https://pustak-mitra-backend.onrender.com/book/getBook");
        const data = res.data;
        console.log("bookcount", data);
        setBookCount(data);
      } catch (error) {
        console.log(error);
      }
    };
    countBook();
  }, []);
  useEffect(() => {
    const countUser = async () => {
      try {
        const res = await axios.get("https://pustak-mitra-backend.onrender.com/user/userCount");
        const data = res.data;
        console.log("usercount", data);
        setUserCount(data);
      } catch (error) {
        console.log(error);
      }
    };
    countUser();
  }, []);
  useEffect(() => {
    const countOrder = async () => {
      try {
        const res = await axios.get("https://pustak-mitra-backend.onrender.com/user/orderCount");
        const data = res.data;
        console.log("ordercount", data.length);
        setOrderCount(data);
      } catch (error) {
        console.log(error);
      }
    };
    countOrder();
  }, []);
  useEffect(() => {
    const allOrders = async () => {
      try {
        const res = await axios.get("https://pustak-mitra-backend.onrender.com/user/orders");
        const data = res.data;
        console.log("all orders", data);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    allOrders();
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Users</h3>
                <p className="text-2xl font-bold">{userCount.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Books</h3>
                <p className="text-2xl font-bold">{bookCount.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Orders</h3>
                <p className="text-2xl font-bold">{OrderCount.length}</p>
              </div>
            </div>
          </div>
        );
      case "Books":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Product List</h2>
            <ul className="space-y-4">
              {bookCount.map((item, index) => (
                <li
                  key={index}
                  className="bg-white p-4 shadow rounded flex items-center space-x-4"
                >
                  {/* Left: Image */}
                  <img
                    src={
                      `http://localhost:4001${item.image}` ||
                      "https://via.placeholder.com/50"
                    }
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  {/* Right: Book Info */}
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case "Users":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Users</h2>
            <div>
              {userCount.map((item, index) => (
                <p key={index}>{item.fullname}</p>
              ))}
            </div>
          </div>
        );
      case "Orders":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Orders</h2>
            {orders.map((order, index) => (
              <div key={index} className="border p-4 my-2 rounded">
                <p>
                  <strong>User:</strong> {order.user?.fullname || "Unknown"} (
                  {order.user?.email || "No email"})
                </p>
                <p>
                  <strong>Book:</strong> {order.book?.name || "Unknown Book"}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{order.price / 100}
                </p>
                <p>
                  <strong>Order ID:</strong> {order.razorpay_order_id || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {order.date
                    ? new Date(order.date).toLocaleString()
                    : "No Date"}
                </p>
              </div>
            ))}
          </div>
        );
      case "Add Books":
        return (
          <>
            <AddBook />
          </>
        );
      case "Settings":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <p>Admin settings configuration.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-gray-900 text-white flex flex-col p-4 fixed top-0 left-0 h-screen z-10">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          {[
            "Dashboard",
            "Users",
            "Orders",
            "Books",
            "Add Books",
            "Settings",
          ].map((item) => (
            <li
              key={item}
              onClick={() => setActivePage(item)}
              className={`cursor-pointer hover:text-gray-400 ${
                activePage === item ? "text-blue-400 font-bold" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 ml-64 flex flex-col h-screen">
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center fixed w-[calc(100%-16rem)] z-10">
          <h1 className="text-xl font-semibold">{activePage}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div className="mt-20 p-6 overflow-y-auto flex-1 bg-gray-100">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin_dashboard;
