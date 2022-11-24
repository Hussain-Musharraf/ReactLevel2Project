import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CharacterGrid from "./components/characters/CharacterGrid";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";

const App = () => {
  //main-content function
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  //Pagination function
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );
      // console.log(result.data)
      setCurrentPage(1);
      setItems(result.data);
      setIsLoading(false);
    };
    fetchItems();
  }, [query]);

  //Get current page
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">

        <Header />

        <Search getQuery={(q) => setQuery(q)} />

        <CharacterGrid isLoading={isLoading} items={currentItems} />

        <div className="pagination">

            <Pagination itemsPerPage={itemsPerPage} totalItems={items.length} paginate={paginate}/>
            
        </div>
    </div>
  );
};

export default App;
