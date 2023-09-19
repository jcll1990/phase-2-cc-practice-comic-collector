function ComicForm({setComics}) {

  function handleSubmit(event) {
    event.preventDefault()

    const newComic = {
      id: "",
      title: event.target.title.value,
      issue: parseInt(event.target.issue.value),
      image_url: event.target.image_url.value,
      fav: false,
      description: event.target.description.value

    }

    fetch("http://localhost:8004/comics", {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(newComic),
    })
    .then(resp => resp.json())
    .then(data => { 

      setComics(prevComics => [...prevComics, data])
      event.target.reset();
    })


  }


  return (

    <form className="comic-form"  onSubmit={handleSubmit}>

      <h2>Add A New Issue</h2>

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

  )
}

export default ComicForm
