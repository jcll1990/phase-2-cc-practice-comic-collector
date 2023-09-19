import Comic from "./Comic"

function ComicsContainer({comics, setComics}) {

  return (
    <>
      <Comic 
      comics = {comics}
      setComics={setComics}
      />
    </>
  )

}

export default ComicsContainer
