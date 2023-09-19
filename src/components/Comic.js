import React, { useState } from 'react';


function Comic({ comics, setComics }) {

  const [show, setShow] = useState(false)

  const sortedcomics = [...comics].sort((a, b) => a.title.localeCompare(b.title));

  function deleteComic(a) {

    setComics(comics.filter(comic => comic.id !== a));
    fetch(`http://localhost:8004/comics/${a}`, {
      method: 'DELETE',
    })
    .then(resp => {
     
    });
  }

  function toggleImage(id) {
    setComics(comics.map(comic => {
      if (comic.id === id) {
        return { ...comic, show: !comic.show }; 
      }
      return comic;
    }));
  }

  function addFav(id) {
    setComics(comics.map(comic => {
      if (comic.id === id) {


        const favComic = {
          id: comic.id,
          title: comic.title,
          issue: comic.isue,
          description : comic.description,
          fav: !comic.fav,
          image_url: comic.image_url
        }

        fetch(`http://localhost:8004/comics/${id}`, {
          method: 'PATCH',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(favComic)
      })
          .then(response => {
      })
        return { ...comic, fav: !comic.fav }
      }
      return comic;
    }));
  }

  function editshow(id) {
    setComics(comics.map(comic => {

      if (comic.id === id) {
        
        return { ...comic, edit: !comic.edit }; 
      }
      return comic;
    }));
  }
  

  function editComic(event) {
    event.preventDefault()

    const editedComic = {
      id: event.target.comic_id.value,
      title: event.target.title.value,
      issue: parseInt(event.target.issue.value),
      image_url: event.target.image_url.value,
      fav:event.target.comic_fav.value,
      description: event.target.description.value
    }

    fetch(`http://localhost:8004/comics/${editedComic.id}`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedComic)
  })
      .then(resp => resp.json())
        .then(data => { 
    
          setComics(prevComics => [...prevComics, data])
          event.target.reset();
        })


console.log(editedComic)

  }


  return (
    <>
      {sortedcomics.map((comic) => (
        <div className="comic-item" key={comic.id}>
          <div  onClick={() => toggleImage(comic.id)}>
          {comic.show ? 
            <img src={comic.image_url} alt={"Comic Issue Image"}/> 
            : 
            <h3>{comic.description}</h3>}
          <h3>{comic.title}</h3>
          <h4>{comic.issue}</h4>
          </div>
          {comic.fav ? 
          <p onClick={() => addFav(comic.id)}>&#9733; FAVORITE!</p>
            :
          <button onClick={() => addFav(comic.id)}>Favorite?</button>}

          <button onClick={() => deleteComic(comic.id)}>Remove</button> 

          <button onClick={() => editshow(comic.id)}>Edit</button> 

            {comic.edit === true? 

                <form className="comic-form"  onSubmit={editComic}>

                <h2>Edit comic</h2>

                <input id="comic_id" value={comic.id} style={{ display: 'none' }} />
                <input id="comic_fav" value={comic.fav} style={{ display: 'none' }} />
          
                <label >Image URL: </label>
                <input name="image_url" id="image_url"/>
          
                <label >Title: </label>
                <input name="title" id="title"/>
          
                <label >Issue Number: </label>
                <input name="issue" type="number" id="issue"/>
          
                <label >Description: </label>
                <input name="description" id="description"/>
          
                <input type="submit" value="Add Issue" />
          
              </form>
              :
              <></>
          }

        </div>
      ))}
    </>
  );
}

export default Comic;



