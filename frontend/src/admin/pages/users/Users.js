import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import UsersForm from "./UsersForm";
import axios from "axios";
import { updateUser, getUsers,deleteUser } from "./api_users";

const Users = () => {
  const [users, setUsers] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    handleAllUsers();
  },[] );

  const handleAllUsers = async () => {
    try {
      const response = await getUsers();
      const data = response.data;
      // Transform array into an object
      const usersObject = data.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      setUsers(usersObject);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers({});
    }
  };
  const handleCreateUser = async (userData) => {
    try {
      const formattedUserData = {
        ...userData,
        date_of_birth: userData.date_of_birth?.split("T")[0] || null,
      };

      await axios.post("http://127.0.0.1:8000/users/list/", formattedUserData, {
        headers: { "Content-Type": "application/json" },
      });

      setShowForm(false);
      handleAllUsers();
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
    }
  };
      const handleUpdateUser = async (userData) => {
        try {
          await updateUser(editUser.id, userData);
          setShowForm(false);
          setEditUser(null);
          handleAllUsers();
        } catch (error) {
          console.error("Error updating user:", error.response?.data || error.message);
        }
      };
      const handleSaveUser = (userData) => {
        if (editUser) {
          handleUpdateUser(userData);
        } else {
          handleCreateUser(userData);
        }
      };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers };
        delete updatedUsers[id];
        return updatedUsers;
      });
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };


  return (
    <Container>
      <h2 className="my-3">Users</h2>
      <Button className="mb-3" onClick={() => { setEditUser(null); setShowForm(true); }}>
        Add User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date Registered</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name+" "+user.last_name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.date_joined)}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditUser(user);
                    setShowForm(true);
                  }}
                >
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsersForm
            user={editUser}
            onSave={handleSaveUser}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Users;