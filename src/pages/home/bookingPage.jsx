import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage(){
    const [cart, setCart] = useState(loadCart());
    const [startingDate, setStartingDate] = useState(formatDate(new Date()));
    const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [total , setTotal] = useState(0);
    const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart(){
        setCart(loadCart());
        calculateTotal();
    }
    
    function calculateTotal(){
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;
        cartInfo.endingDate = endingDate;
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
        .then((res)=>{
            setTotal(res.data.total);
        }).catch((err)=>{   
            console.error(err);
        })
    }

    useEffect(()=>{
        calculateTotal();
    },[startingDate, endingDate]);
    
    function handleBookingCreation(){
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endingDate = endingDate;
        cart.days = daysBetween;

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err)=>{
            console.error(err);
            toast.error("Failed to create booking");
        })
    }

    return(
        <div className="w-full min-h-screen flex flex-col items-center p-4 md:p-6 bg-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-accent text-center">Create Booking</h1>
            <div className="w-full max-w-md flex flex-col items-center gap-4 mt-4">
                <label className="w-full flex flex-col">
                    <span className="text-accent font-semibold">Starting Date:</span>
                    <input 
                        type="date" 
                        value={startingDate} 
                        onChange={(e) => setStartingDate(e.target.value)} 
                        className="w-full border border-secondary rounded-md p-2"
                    />
                </label>
                <label className="w-full flex flex-col">
                    <span className="text-accent font-semibold">Ending Date:</span>
                    <input 
                        type="date" 
                        value={endingDate} 
                        onChange={(e) => setEndingDate(e.target.value)} 
                        className="w-full border border-secondary rounded-md p-2"
                    />
                </label>
                <p className="text-accent font-medium text-center">Total Days: {daysBetween}</p>
            </div>
            <div className="w-full max-w-md flex flex-col items-center mt-4">
                {
                    cart.orderedItems.map((item) => (
                        <BookingItem itemKey={item.key} key={item.key} qty={item.qty} refresh={reloadCart}/>
                    ))
                }
            </div>
            <div className="w-full max-w-md flex justify-center mt-4">
                <p className="text-accent font-semibold text-lg">Total: {total.toFixed(2)}</p>
            </div>
            <div className="w-full max-w-md flex justify-center mt-4">
                <button className="w-full bg-accent text-white px-4 py-2 rounded-md text-center" onClick={handleBookingCreation}>
                    Create Booking
                </button>
            </div>
        </div>
    );
}
