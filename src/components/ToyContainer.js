import React, { useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toyData, deleteToy, addLike, sortToys}) {
  const toyCollection = toyData.map(toy => <ToyCard toy={toy} deleteToy={deleteToy} addLike={addLike} key={toy.id}/>)
  const [selectedValue, setSelectedValue] = useState('')

  return (
    <>
      <select value={selectedValue} onChange={(e)=>{
        setSelectedValue(e.target.value)
        sortToys(e.target.value)
      }}> 
        <option value="no sort">No Sort</option>
        <option value="likes">Sort By Likes</option>
      </select>
      <div id="toy-collection">
        {toyCollection}
      </div>
    </>
  );
}

export default ToyContainer;
