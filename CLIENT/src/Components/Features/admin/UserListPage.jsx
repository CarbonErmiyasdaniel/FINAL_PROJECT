import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  Loader2,
  Users,
  Search,
  ChevronUp,
  ChevronDown,
  User,
  HeartHandshake,
  Stethoscope,
} from "lucide-react";
import { toast } from "react-toastify";
import UpdateUser from "./updateUser";

// Utility function to format the role string (e.g., 'lab_technician' -> 'Lab Technician')
const formatRole = (role) => {
  return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

// Define primary roles for display
const PRIMARY_ROLES = ["admin", "donor"];
const STAFF_ROLES = [
  "nurse",
  "lab_technician",
  "post_counselor",
  "hospital_staff",
];
const ALL_ROLES = [...PRIMARY_ROLES, ...STAFF_ROLES];

// ------------------------------------------------------------------

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [userToEdit, setUserToEdit] = useState(null);

  // 1. Fetch Users from Backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/admins/getAllUsers", {
          withCredentials: true,
        });
        setUsers(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to fetch users. Please check server status.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // HANDLER: To open the modal
  const handleEditClick = (user) => {
    setUserToEdit(user);
  };
  // HANDLER: To close the modal
  const handleCloseModal = () => {
    setUserToEdit(null);
  };
  // HANDLER: To update the list after a successful edit
  const handleUserUpdated = (updatedUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  // DELETE HANDLER: To delete a user
  const handleDelete = async (userId, userName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the user: ${userName}? This action cannot be undone.`
      )
    ) {
      try {
        await axios.delete(`/api/admins/users/${userId}`, {
          withCredentials: true,
        });

        toast.success(`User '${userName}' deleted successfully.`);

        setUsers((currentUsers) =>
          currentUsers.filter((user) => user._id !== userId)
        );
      } catch (err) {
        console.error("Error deleting user:", err);
        const errorMessage =
          err.response?.data?.msg || "Failed to delete user. Server error.";
        toast.error(errorMessage);
      }
    }
  };

  // FUNCTION: Count users by role
  const countUsersByRole = (role) => {
    if (role === "staff") {
      return users.filter((user) => STAFF_ROLES.includes(user.role)).length;
    }
    return users.filter((user) => user.role === role).length;
  };

  const getTotalStaffCount = () => {
    return users.filter((user) => STAFF_ROLES.includes(user.role)).length;
  };

  // 2. Sorting Logic
  const sortedUsers = React.useMemo(() => {
    let sortableItems = [...users];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = String(a[sortConfig.key]).toLowerCase();
        const bValue = String(b[sortConfig.key]).toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    );
  };

  // 3. Filtering Logic
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatRole(user.role).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 4. Loading/Error State Render
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <Loader2 className="animate-spin h-8 w-8 text-red-700 dark:text-red-500" />
        <p className="ml-3 text-lg text-gray-600 dark:text-gray-400">
          Loading user data...
        </p>
      </div>
    );
  }

  if (error && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-red-50 dark:bg-red-950 rounded-xl shadow-lg border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
          <List className="w-6 h-6" /> User List
        </h1>
        <p className="text-red-700 dark:text-red-300 font-medium">
          Error: {error}
        </p>
        <p className="text-red-500 dark:text-red-400 mt-2">
          Could not retrieve user data. Please try again later.
        </p>
      </div>
    );
  }

  // 5. Main Content Render (Table)
  return (
    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-4 border-red-700 dark:border-red-600">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
        <Users className="text-red-700 dark:text-red-500 w-8 h-8" /> All System
        Users (Blood Management)
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        A comprehensive list of all registered users in the system, categorized
        for quick insights.
      </p>

      {/* USER COUNTS BY ROLE CATEGORY (Dark Mode applied to backgrounds/colors) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Total Users Card */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow border-l-4 border-gray-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase">
              Total Users
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {users.length}
            </p>
          </div>
          <Users className="w-8 h-8 text-gray-400" />
        </div>

        {/* Admin Card */}
        <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-lg shadow border-l-4 border-red-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-500 dark:text-red-300 uppercase">
              Admins
            </p>
            <p className="text-2xl font-bold text-red-700 dark:text-red-400">
              {countUsersByRole("admin")}
            </p>
          </div>
          <User className="w-8 h-8 text-red-400" />
        </div>

        {/* Donor Card */}
        <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg shadow border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-500 dark:text-blue-300 uppercase">
              Potential Donors
            </p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {countUsersByRole("donor")}
            </p>
          </div>
          <HeartHandshake className="w-8 h-8 text-blue-400" />
        </div>

        {/* Staff Card */}
        <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg shadow border-l-4 border-green-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-500 dark:text-green-300 uppercase">
              Staff Total
            </p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              {getTotalStaffCount()}
            </p>
          </div>
          <Stethoscope className="w-8 h-8 text-green-400" />
        </div>
      </div>

      {/* Search Input (Dark Mode applied) */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150"
        />
      </div>

      {/* Table Container (Dark Mode applied) */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-red-50 dark:bg-red-800/50">
            <tr>
              {/* # Column */}
              <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                #
              </th>
              {/* Name Header */}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-red-100 dark:hover:bg-red-800"
                onClick={() => requestSort("name")}
              >
                Name {getSortIcon("name")}
              </th>
              {/* Email Header */}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-red-100 dark:hover:bg-red-800 hidden sm:table-cell"
                onClick={() => requestSort("email")}
              >
                Email {getSortIcon("email")}
              </th>
              {/* Role Header */}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-red-100 dark:hover:bg-red-800"
                onClick={() => requestSort("role")}
              >
                Role {getSortIcon("role")}
              </th>
              {/* Actions Header */}
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-100"
                >
                  {/* # Cell */}
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                    {index + 1}
                  </td>
                  {/* Name Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  {/* Email Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    {user.email}
                  </td>
                  {/* Role Cell */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : user.role === "donor"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {formatRole(user.role)}
                    </span>
                  </td>
                  {/* Actions Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-150 mr-3"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-500 transition duration-150"
                      onClick={() => handleDelete(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 text-lg"
                >
                  {users.length > 0
                    ? "No users match your search criteria."
                    : "No users found in the system."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Conditional Modal Render */}
      {userToEdit && (
        <UpdateUser
          user={userToEdit}
          onClose={handleCloseModal}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
};

export default UserListPage;
