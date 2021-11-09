import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toyData, deleteToy, addLike}) {
  const toyCollection = toyData.map(toy => <ToyCard toy={toy} deleteToy={deleteToy} addLike={addLike} key={toy.id}/>)
  return (
    <div id="toy-collection">{toyCollection}</div>
  );
}

export default ToyContainer;
