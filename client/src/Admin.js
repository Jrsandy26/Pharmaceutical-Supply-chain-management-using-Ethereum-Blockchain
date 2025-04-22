import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "https://pharma-backend-z97z.onrender.com";

const roleColors = {
  Admin: "bg-red-500",
  Manufacturer: "bg-green-500",
  Distributor: "bg-blue-500",
  Customer: "bg-yellow-500",
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the admin is authenticated
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(true); // Track if the password dialog is open
  const [passwordInput, setPasswordInput] = useState(""); // Track the entered password
  const [password, setPassword] = useState("admin@b300"); // Default password

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      axios
        .get(`${API_URL}/admin/users`)
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Failed to fetch users:", err))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = () => {
    if (passwordInput === password) {
      setIsAuthenticated(true);
      setPasswordDialogOpen(false);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleDelete = (userID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios
        .delete(`${API_URL}/admin/users/${userID}`)
        .then(() => {
          setUsers(users.filter((user) => user.userID !== userID));
        })
        .catch((err) => console.error("Failed to delete:", err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-10">
      {/* Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => {}}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the admin password to access the dashboard.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {isAuthenticated && (
        <>
          <div className="text-center mb-10">
            <img src="/images/logo.png" alt="Logo" className="mx-auto w-24 mb-4" />
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Manage platform users & view login activity</p>
          </div>

          {loading ? (
            <div className="flex justify-center mt-20">
              <CircularProgress />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user, index) => (
                <div
                  key={index}
                  className={`rounded-xl shadow-lg p-6 text-white ${roleColors[user.role] || "bg-gray-600"} relative`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <IconButton onClick={() => handleDelete(user.userID)} color="inherit">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <p className="mt-2 text-sm">Role: <span className="font-semibold">{user.role}</span></p>
                  <p className="text-sm">User ID: <span className="font-mono">{user.userID}</span></p>
                  <p className="mt-2 text-sm">
                    <strong>Login Count:</strong> {user.loginCount || 0}
                  </p>
                  <p className="text-sm">
                    <strong>Last Login:</strong>{" "}
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
