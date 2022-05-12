import React, {useState} from "react";
import  styles from "./react.module.css"
import Navbar from "../../../components/basic/Navbar";


function BasicReact() {
    const data = [
      { id: 1, name: "Spiderman" },
      { id: 2, name: "Batman" },
      { id: 3, name: "Lego" },
    ];
    const [email, setEmail] = useState("")
    const [keyword, setKeyword] = useState("")
    const [showDate, setShowDate] = useState(false)
    const handleClick = (age, name) => {
        alert("Button clicked !");
        console.log(name, age);
      };
    
      const handleSubmit = (event, data) => {
        event.preventDefault();
        console.log("Submit", data);
      };
    
      const handleReset = (event) => {
        event.preventDefault();
        console.log("Reset");
      };
      const handleChangeEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
      };
      const handleSearch = (event) => {
        if (event.key === "Enter"){
            console.log("user press enter")
            console.log("keyword: ", event.target.value)

        }
      };

return (
    <>
     <h1>Basic React Page</h1>
     <hr />
     <h3>Component</h3>
      <Navbar />
      <card/>
     <h2>mapping</h2>
     {data.map((item, index)=>(
         <div key={item.id}>
            <button>{item.name}</button>
         </div>
     ))}
     <h2>Event click</h2>
     <button onClick={handleClick}>click</button>
     <button onClick={()=>handleClick(1, "tes")}>click console</button>
        <form 
        //onSubmit={(event)=> handleSubmit(event,"data")}
        onSubmit={handleSubmit} onReset={handleReset}>
            <button type="submit">submit</button>
            <button type="reset">reset</button>
        </form>
        <h2>Input</h2>
        <input type="email"placeholder="john@gmail.com" 
        onChange={handleChangeEmail}
        //onChange={(event)=> setEmail(event.target.value)}
        />
        <h6>your email is {email}</h6>
        <h3>conditonal rendering</h3>
        <input type="text" placeholder="search..." onKeyPress={handleSearch} />
        <button onClick={()=> setShowDate(!showDate)}>Show Date</button>
      {showDate && <h1>{new Date().toLocaleDateString()}</h1>}
        <h3>Ternary Operator</h3>
        {/* {data.length >0 ?():()} */}
        {data.length >0 ? (
            data.map((item, index)=>(
         <div key={item.id}>
            <button>{item.name}</button>
         </div>
     ))
     ):( 
         <h6>data not found</h6>
     )}
     <h3>style css</h3>
     {/* react module */}
     <h1 className={`${styles.heading} ${styles.textUnderline} text-center`}>
        Hello World
      </h1>
      <h1 className={ (styles.textUnderline,styles.heading2)}>Hello World</h1>
      <h1 className={styles.heading2}>Hello World</h1>

    </>
)
}
export default BasicReact;
