import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyData, setToyData] = useState([]);
  const [sort, setSort] = useState("no sort");
  
  const displayToys = [...toyData].sort((a,b) => {
    if (sort === "no sort"){
      return 0;
    } else if (sort === "likes") {
      return b.likes - a.likes;
    }
  })

  useEffect(() =>{
    fetch(`http://localhost:3001/toys`)
      .then(r => r.json())
      .catch(error => console.error(error))
      .then(data => {
        setToyData([...data])
      })
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const addToy = (newToy) =>{
    const configObj = {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    }

    fetch("http://localhost:3001/toys", configObj)
    .then(r => r.json())
    .catch(error => console.error(error))
    .then(data => {
      setToyData([...toyData, data])
    })
  }

  const deleteToy = (id) =>{
    fetch(` http://localhost:3001/toys/${id}`, {method: "DELETE"})
      .then(() =>{
        const oneLess = toyData.filter(toy => toy.id !== id)

        setToyData([...oneLess])
      })
  }

  const addLike = (toy) =>{
    toy.likes +=1;
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toy)
    }

    fetch(`http://localhost:3001/toys/${toy.id}`, configObj)
    .then(r => r.json())
    .catch(error => console.error(error))
    .then(upToy =>{
      const oneMoreLike = toyData.map(item =>{
        if (item.id === toy.id){
          return upToy
        } else{
          return item
        }
      })
      setToyData(oneMoreLike)
    })
  }

  const sortToys = (value)=>{
    setSort(value)
  }

  if(toyData.length === 0){
    return <p>Loading... </p>
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toyData={displayToys} deleteToy={deleteToy} addLike={addLike} sortToys={sortToys}/>
    </>
  );
}

export default App;
