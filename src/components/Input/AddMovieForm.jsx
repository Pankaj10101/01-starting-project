import React, { useState } from "react";
import "./AddMovieForm.css";
const AddMovieForm = () => {
  const [data, setData] = useState({});
  const handleChange = (name, value) => {
    setData((prev)=>({...prev, [name]:value}))
  };

const submitForm = (e)=>{
    e.preventDefault()
    console.log(data)
}

  return (
    <div className="container">
      <form className="form" onSubmit={submitForm}>
        <div className="item">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="item">
          <label htmlFor="openingText">Opening Text</label>
          <input
            type="text"
            id="openingText"
            name="openingText"
            placeholder="Enter Opening Text"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="item">
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <button className="btn">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
