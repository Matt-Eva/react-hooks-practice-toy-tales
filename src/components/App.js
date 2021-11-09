import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [unsortedToys, setUnsortedToys] = useState([])
  const [toyData, setToyData] = useState([]);
  

  useEffect(() =>{
    fetch(`http://localhost:3001/toys`)
      .then(r => r.json())
      .catch(error => console.error(error))
      .then(data => {
        setToyData([...data])
        setUnsortedToys([...data])
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
      setUnsortedToys([...unsortedToys, data])
      setToyData([...toyData, data])
    })
  }

  const deleteToy = (id) =>{
    fetch(` http://localhost:3001/toys/${id}`, {method: "DELETE"})
      .then(() =>{
        const oneLess = toyData.filter(toy => toy.id !== id)
        const unorderedOneLess = unsortedToys.filter(toy => toy.id !== id)

        setToyData([...oneLess])
        setUnsortedToys([...unorderedOneLess])
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
      const unsortedMoreLike = unsortedToys.map(item =>{
        if (item.id === toy.id){
          return upToy
        } else{
          return item
        }
      })
      setToyData(oneMoreLike)
      setUnsortedToys(unsortedMoreLike)
    })
  }

  const sortToys = (value)=>{
    if (value === "no sort"){
      console.log(value)
      console.log(unsortedToys)
      setToyData([...unsortedToys])
    } else if(value === "likes"){
      const sortedLikes = toyData.sort((a,b) =>{
        return b.likes - a.likes;
      })
      setToyData([...sortedLikes])
    }
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
      <ToyContainer toyData={toyData} deleteToy={deleteToy} addLike={addLike} sortToys={sortToys}/>
    </>
  );
}

export default App;
