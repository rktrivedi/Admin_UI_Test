import {useState} from "react";
import "./App.css";
import Users from "./Components/Users/Users";

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({selected}) => {
    setCurrentPage(selected);
  };

  return (
    <div className="App">
      <Users currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
