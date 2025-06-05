import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserSlash, FaUserCheck } from "react-icons/fa";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      fetchUsers();
    }
  }, [loading]);

  function handleBlockUser(email, isBlocked) {
    if (!window.confirm(`Are you sure you want to ${isBlocked ? "unblock" : "block"} this user?`)) return;

    const token = localStorage.getItem("token");

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-black">Admin Users</h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border border-gray-300 rounded-lg shadow-md bg-white">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="p-3 text-left text-sm">Profile</th>
                <th className="p-3 text-left text-sm">Name</th>
                <th className="p-3 text-left text-sm">Email</th>
                <th className="p-3 text-left text-sm">Role</th>
                <th className="p-3 text-left text-sm">Phone</th>
                <th className="p-3 text-left text-sm hidden md:table-cell">Address</th>
                <th className="p-3 text-left text-sm">Status</th>
                <th className="p-3 text-center text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className={`border ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition-all`}>
                  <td className="p-3">
                    <img
                      src={user.profilePicture || "https://via.placeholder.com/50"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3 text-black">{user.firstName} {user.lastName}</td>
                  <td className="p-3 text-black">{user.email}</td>
                  <td className="p-3 text-black capitalize">{user.role}</td>
                  <td className="p-3 text-black">{user.phone || user.phoneNumber}</td>
                  <td className="p-3 text-black hidden md:table-cell">{user.address}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${user.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                    </span>
                  </td>
                  <td className="p-3 flex justify-center">
                    <button
                      onClick={() => handleBlockUser(user.email, user.isBlocked)}
                      className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 transition ${
                        user.isBlocked ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {user.isBlocked ? <FaUserCheck /> : <FaUserSlash />} {user.isBlocked ? "Unblock" : "Block"}
                    </button>
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

