
import {useState} from "react"
function Addbooks() {
 const [data, setData]=useState({
    name:"",
    title:"",
    category:"",
    price:"",
    image:""
 })

 const handleChange=(e)=>{
    const {name,value}=e.target
    setData((pre)=>({...pre, [name]:value}))
 }
 const handleSubmit= async(e)=>{
      e.preventDefault()

      try{
        const response= await fetch(`http://localhost:4001/book/postBook`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
      });
      const result=await response.json()
      console.log(result)
      }
      catch(error){
        console.log("error",error)
      }
 }

  return (
    <>
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name :</label>
                <input type='text' name='name' onChange={handleChange} /><br/>
                <label>Title :</label>
                <input type='text' name='title' onChange={handleChange} /><br/>
                <label>category:</label>
                <input type='text' name='category' onChange={handleChange} /><br/>
                <label>Price :</label>
                <input type='text' name='price' onChange={handleChange} /><br/>
                <label>Image :</label>
                <input type='file' name='image' onChange={handleChange} /><br/>
                <button>
                    Submit
                </button>
            </form>
        </div>
    </>
  );
}

export default Addbooks;
