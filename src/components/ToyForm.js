import React, {useState} from "react";

function ToyForm({addToy}) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0,
  })

  

  const handleChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setFormData({
      name: "",
      image: "",
      likes: 0,
    })
  }

  return (
    <div className="container" >
      <form className="add-toy-form" onSubmit={(e) => {
        handleSubmit(e)
        addToy(formData)
        }} 
      >
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value = {formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value = {formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
