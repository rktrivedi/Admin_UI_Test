import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import {useParams} from "react-router-dom";
import styles from "./Users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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

  const handleEdit = (id) => {};

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
        <input
          className={styles.searchBar}
          type="text"
          name="name"
          placeholder="Search by any field"
          value={searchQuery}
          onChange={handleSearch}
        />
        <FaSearch className={styles.searchIcon} />
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
                  className={styles.editButton}
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className={styles.deleteButton}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <div className={styles.footer}>
        <div className={styles.paginationContainer}>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
            previousLabel={"Prev"}
            nextLabel={"Next"}
          />
          <button
            onClick={() => {
              setSelectedRows([]);
            }}
            className={styles.deleteSelectedButton}
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
