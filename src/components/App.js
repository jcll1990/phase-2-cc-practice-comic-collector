import React from "react";
import ComicsContainer from "./ComicsContainer";
import ComicForm from "./ComicForm";

import { useState, useEffect } from "react"; 

function App() {

  const [comics, setComics] = useState([])


  useEffect(() => {
   
    fetch(`http://localhost:8004/comics`)
      .then(resp => resp.json())
      .then(data => {
        const addShowandEdit = data.map(comic => ({
          ...comic,
          show: true,
          edit: false
        }))
        setComics(addShowandEdit)
      })            
    }, []);


  return (
    <div className="App">

      <h1>Comicbook Collector</h1>

      <div className="grid with-sidebar">

        <div className="flex-container">
          <ComicsContainer 
          setComics={setComics}
          comics = {comics}

          />
        </div>

        <div className="sidebar">
          <ComicForm 
          setComics={setComics}
          />
        </div>

      </div>


    </div>
  );
}

export default App;
