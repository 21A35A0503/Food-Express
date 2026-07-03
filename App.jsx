import React,{useState,useCallback,useMemo,useEffect,useContext,createContext} from "react";
import burger from "./assets/burger.png";
import pizza from "./assets/pizza.png";
import pasta from "./assets/pasta.png";
import maggie from "./assets/maggie.png";

const styles = {
  title: {
  textAlign: "center",
  color: "#ff6b6b",
  fontSize: "32px",
  fontWeight: "bold",
},

status: {
  textAlign: "center",
  color: "green",
  fontWeight: "600",
},
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "8px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#ff6b6b",
    color: "white",
    cursor: "pointer",
    fontWeight:"bold",
  },
  list: {
  listStyle: "none",
  padding: 0,
},
  listItem:{
    margin: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight:"bold",
  },
  section: {
  marginTop: "20px",
  },
  p: {
    color:"green",
    fontWeight:"bold",
}
};
const context=createContext();
function Header(){
    const {name,status}=useContext(context);
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>{name}</h1>
            <h3 style={styles.status}>Delivery Status: {status}</h3>
        </div>
    );
}
function Menu({
    foodName,setFoodName,foodPrice,setFoodPrice,addFood,menuItems,addToCart,
}) {
    return(
        <div style={styles.section}>
            <h2 style={{marginBottom:"15px"}}>🍽️ Menu Items</h2>
            <input type="text" placeholder="Food Name" value={foodName} onChange={(e)=>setFoodName(e.target.value)} style={styles.input}/>
            <input type="number" placeholder="Food Price" value={foodPrice} onChange={(e)=>setFoodPrice(e.target.value)} style={styles.input}/>
            <button onClick={addFood} style={styles.button}>Add Food Items</button>
            <ul style={styles.list}>
                {menuItems.map((item)=> (
                  <li key={item.id} style={styles.listItem}>
                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                 <img src={item.image} alt={item.name} style={{width: "70px",height: "60px",borderRadius: "10px",objectFit: "cover",}}/>
                 </div>
                  <div>
                     <div>{item.name}</div>
                     <p style={{color:"#ff6b6b",margin:0}}>₹{item.price}</p>
                  </div>
                  <button onClick={()=>addToCart(item)} style={styles.button}>Add To Cart</button>
                  </li>
                ))}
            </ul>
        </div>
    );
}
function Cart({cartItems,removeFromCart,totalAmount})
{
    return(
        <div style={styles.section}>
            <h2 style={{marginBottom:"15px"}}>🛒 Cart</h2>
            {cartItems.length===0? (<p style={styles.p}>🛒Cart is Empty</p>) : 
               (<ul style={styles.list}>
                 {cartItems.map((item,index)=>(
                 <li key={index} style={styles.listItem}>
                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                 <img src={item.image} alt={item.name} style={{width: "60px",height: "60px",borderRadius: "10px",objectFit: "cover",}}/>
                 </div>
                 <div>
                    <div>{item.name}</div>
                    <p style={{color:"#ff6b6b",margin:0}}>₹{item.price}</p>
                </div>
                    <button onClick={()=>removeFromCart(index)} style={styles.button}>Remove</button>
                 </li>
                ))}
                </ul>
            )}
            <h3 style={{ color: "#ff6b6b" }}>💰 Total Amount : ₹{totalAmount}</h3>
        </div>
    );
}
function App(){
    const[foodName,setFoodName]=useState("");
    const[foodPrice,setFoodPrice]=useState("");
    const[menuItems,setMenuItems]=useState([]);
    const[cartItems,setCartItems]=useState([]);
    const[status]=useState("Available");
    useEffect(()=>{
        setMenuItems([
            {
                id:1,name:"Burger",price:120,image:burger,
            },
            {
                id:2,name:"Pizza",price:250,image:pizza,
            },
            {
                id:3,name:"Pasta",price:180,image:pasta,
            },
            {
                id:4,name:"Maggie",price:60,image:maggie
            },
        ]);
    },[]);
    const addFood=useCallback(()=>{
        if(foodName.trim()===""||foodPrice===""){
            return;
        }
        const newFood={
            id:Date.now(),
            name:foodName,
            price:Number(foodPrice),
        };
        setMenuItems((prev)=>[...prev,newFood]);
        setFoodName("");
        setFoodPrice("");
    },[foodName,foodPrice]);

    const addToCart=useCallback((item)=>{
        setCartItems((prev)=>[...prev,item]);
    },[]);

    const removeFromCart=useCallback((index)=>{
        setCartItems((prev)=>prev.filter((_,i)=>i!==index));
    },[]);

    const totalAmount=useMemo(()=>{
        return cartItems.reduce((total,item)=>total+item.price,0);
    },[cartItems]);

    return(
        <context.Provider value={{name:"Food Hub",status}}>
        <div style={styles.container}>
            <Header />
            <Menu 
            foodName={foodName}
            setFoodName={setFoodName}
            foodPrice={foodPrice}
            setFoodPrice={setFoodPrice}
            addFood={addFood}
            menuItems={menuItems}
            addToCart={addToCart}
            />
            <Cart 
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            totalAmount={totalAmount}
            />
        </div>
        </context.Provider>
    );
}
export default App;
