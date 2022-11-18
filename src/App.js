import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import CharacterGrid from './components/characters/CharacterGrid';
import Header from './components/ui/Header';
import Search from './components/ui/Search';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

const  App= () => {
  //main-content function
  const [items,setItems]=useState([])
  const [isLoading,setIsLoading]=useState(true)
  const [query,setQuery]=useState('');

  //Pagination function
  //const [posts,setPosts]=useState([]);
  //const [loading,setLoading]=useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage]=useState(10);


  useEffect(()=>{
    const fetchItems= async ()=>{
      const result=await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)
     // console.log(result.data)
      setItems(result.data)
      setIsLoading(false)
    }
    fetchItems()
  },[query]);

  // ////Paginatio-Effect

  //   useEffect(()=>{ 
  //   const fetchPosts=async()=>{
  //     //setLoading(true);
  //     //const res=await axios.get('https://jsonplaceholder.typicode.com/posts');
  //     //setPosts(res.data);
  //     //setLoading(false);
  //   }
  //   fetchPosts();
  // },[])

   //Get current posts
   
   const indexOfLastPost =currentPage*postsPerPage;
   const indexOfFirstPost=indexOfLastPost-postsPerPage;
 
   const currentPosts=items.slice(indexOfFirstPost,indexOfLastPost);
 
   //Change page
   const paginate=(pageNumber)=>setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Header/>
      <Search getQuery={(q)=>setQuery(q)}/>
      <CharacterGrid isLoading={isLoading} items={items}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={items.length} paginate={paginate}/>
    </div>
  );
}

export default App;
