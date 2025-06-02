import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

function Cards({ item }) {
  const [authUser] = useAuth();
  const [userBooks, setUserBooks] = useState([]);


  useEffect(() => {
  const fetchUserBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/user/${authUser._id}`);
      setUserBooks(res.data.books); // assuming it returns books: [...]
    } catch (error) {
      console.error("Error fetching user books", error);
    }
  };

  if (authUser?._id) fetchUserBooks();
}, [authUser]);
  const openFile = () => {
    const fullPath = `http://localhost:4001${item.filePath}`;
    window.open(fullPath, "_blank");
  };

  const handleImageClick = () => {
  if (item.price === 0 || userBooks.includes(item._id)) {
    openFile();
  } else {
    toast.error("Please buy the book to view.");
  }
};


  const handleBuyNow = async () => {
    try {
      const response = await fetch(`http://localhost:4001/user/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: item.price }),
      });
      const data = await response.json();
      handlePaymentVerify(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handlePaymentVerify = async (orderdata) => {
    const razorpay_key = "rzp_test_ZW4IdrFehIRvKt";
    const options = {
      key: razorpay_key,
      amount: orderdata.data.amount,
      currency: orderdata.data.currency,
      name: "Suraj Bali Sahu",
      description: "Test mode",
      order_id: orderdata.data.id,
      handler: async (response) => {
        try {
          const res = await fetch(`http://localhost:4001/user/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: authUser._id,
              bookId: item._id,
              price: orderdata.data.amount,
            }),
          });
          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
            openFile();
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure onClick={handleImageClick} className="cursor-pointer">
            <img
              src={`http://localhost:4001${item.image}`}
              alt="Book"
              className="h-[300px] w-full object-contain rounded-t-lg pt-2"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>

              {item.price > 0 && !authUser?.books?.includes(item._id) && (
                <button
                  onClick={handleBuyNow}
                  className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                >
                  Buy Now
                </button>
              )}
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
