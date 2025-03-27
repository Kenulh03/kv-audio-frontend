import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeOrder, setActiveOrder] = useState(null);
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/orders/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(res.data);
				setOrders(res.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};
		if (loading) {
			fetchOrders();
		}
	}, [loading]);

	function handleOrderStatusChange(orderId, status) {
		const token = localStorage.getItem("token");
		
		axios.put(
			`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
			{
				status: status,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then(()=>{
			console.log("Order status updated");
			setModalOpened(false);
			setLoading(true);
		}).catch((err)=>{
			console.error(err);
			setLoading(true);
		})
	}

	return (
		<div className="p-4 md:p-6">
			<h1 className="text-2xl font-semibold mb-4">Admin Orders</h1>
			{loading ? (
				<p className="text-center text-gray-600">Loading...</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border text-black border-gray-300 rounded-lg shadow-md text-sm md:text-base">
						<thead className="bg-gray-200">
							<tr>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Order ID</th>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Email</th>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Days</th>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Starting Date</th>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Ending Date</th>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Total Amount</th>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Approval Status</th>
								<th className="px-2 py-1 md:px-4 md:py-2 text-left">Order Date</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr
									key={order._id}
									className="border-t hover:bg-gray-100 cursor-pointer"
									onClick={() => {
										setActiveOrder(order);
										setModalOpened(true);
									}}
								>
									<td className="px-2 py-1 md:px-4 md:py-2 ">{order.orderId}</td>
									<td className="px-2 py-1 md:px-4 md:py-2">{order.email}</td>
									<td className="px-2 py-1 md:px-4 md:py-2">{order.days}</td>
									<td className="px-2 py-1 md:px-4 md:py-2">
										{new Date(order.startingDate).toLocaleDateString()}
									</td>
									<td className="px-2 py-1 md:px-4 md:py-2">
										{new Date(order.endingDate).toLocaleDateString()}
									</td>
									<td className="px-2 py-1 md:px-4 md:py-2">{order.totalAmount.toFixed(2)}</td>
									<td className="px-2 py-1 md:px-4 md:py-2">{order.status}</td>
									<td className="px-2 py-1 md:px-4 md:py-2">
										{new Date(order.orderDate).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
