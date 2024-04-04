import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import {useParams} from "react-router-dom";
import styles from "./Users.module.css";
import Pagination from "../Paginate/Paginate";
import {IoMdClose} from "react-icons/io";
import Search from "../Search/Search";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [editedUser, setEditedUser] = useState(null);

  const {id} = useParams();
  const itemsPerPage = 10;

  useEffect(() => {
    getUsersDetails();
  }, []);

  const getUsersDetails = () => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  };

  const handleDeleteSelected = () => {
    setUsers(users.filter((user) => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  const handleEdit = (id, updatedUserData) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditedUser(userToEdit);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        ...updatedUserData,
      };

      setUsers(updatedUsers);

      setEditedUser(updatedUsers[userIndex]);
    }
  };

  const handleUserUpdate = () => {
    const userIndex = users.findIndex((user) => user.id === editedUser.id);

    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = editedUser;
      console.log("Updated user details:", editedUser);

      setUsers(updatedUsers);
      setEditedUser(null);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(0);
  };

  const handlePageChange = ({selected}) => {
    setCurrentPage(selected);
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === users.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map((user) => user.id));
    }
  };

  const filteredUsers = users.filter((user) => {
    const {name, email, role} = user;
    const search = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      role.toLowerCase().includes(search)
    );
  });

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className={styles.container}>
      <h1>Admin UI</h1>
      <br />
      <div className={styles.searchContainer}>
        <Search onSearch={handleSearch} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === users.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className={styles.columnHeader}>Name</th>
            <th className={styles.columnHeader}>Email</th>
            <th className={styles.columnHeader}>Role</th>
            <th className={styles.columnHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className={styles.tableRow}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => toggleRowSelection(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className={styles.btn}>
                <button
                  onClick={() => handleEdit(user.id)}
                  className={styles.editicon}
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className={styles.deleteicon}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
          {/* Modal for editing user details */}
          {editedUser && (
            <div className={styles.modal}>
              <div className={styles.modalheading}>
                <h2>Edit User</h2>
                <IoMdClose
                  className={styles.closeIcon}
                  onClick={() => setEditedUser(null)}
                />
              </div>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({...editedUser, name: e.target.value})
                }
              />
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({...editedUser, email: e.target.value})
                }
              />
              <input
                type="text"
                value={editedUser.role}
                onChange={(e) =>
                  setEditedUser({...editedUser, role: e.target.value})
                }
              />
              <div className={styles.modalButton}>
                <button onClick={handleUserUpdate} className={styles.update}>
                  Update
                </button>
                <button
                  onClick={() => setEditedUser(null)}
                  className={styles.deleteButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </tbody>
      </table>
      <br />
      <br />
      <div className={styles.footer}>
        <div className={styles.paginationContainer}>
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
        <button
          onClick={handleDeleteSelected}
          className={styles.deleteSelectedButton}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default Users;
