import { useState } from "react";

export default function Testing(){
    const [count,setCount] = useState(0);
    //coconut,banana,apple,other
    const[itemName,setItemName] = useState("Coconut")
    
    return(
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <h1 className="text-9xl">
                {count} {itemName}s
            </h1>

            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                () => {
                    const newCount = count +1;
                    setCount(newCount);
                }
            }>
               Count
            </button>
            <div className="w-full flex justify-evenly items-center p-4">
            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                () => {
                    setItemName("Coconut")
                }
            }>
               Coconut
            </button>
            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                () => {
                    setItemName("Banana")
                }
            }>
               Banana
            </button>
            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                () => {
                    setItemName("Apple")
                }
            }>
               Apple
            </button>
            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                () => {
                    setItemName("Other")
                }
            }>
               Other
            </button>
            </div>
        </div>
    )
}