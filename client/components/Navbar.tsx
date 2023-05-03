import { useState } from "react";
import Image from 'next/image'
import Black from '../assets/img/black.png'

export default function Navbar() {

    const [items, setItems] = useState(3)
    const [totalPrice, setTotalPrice] = useState(0)

    return (
        <>
            <div className="flex mx-60 my-16 justify-between">
                <Image src={Black} className='border-black border w-96 h-20' alt={'site-icon'}/>

                <div className="flex">
                    <input placeholder="Search" type="text" className='border-black border w-96 h-10'></input>
                    <button className='border-black border w-10 h-10 overflow-hidden'>Submit</button>
                </div>

                <div className="flex">
                    <button className='border-black border w-10 h-10 overflow-hidden'>Profile</button>
                    <button className='border-black border w-10 h-10 overflow-hidden'>Cart</button>
                    <span>{items} {items == 1 ? 'item' : 'items'} - £{totalPrice}</span>
                </div>

            </div>
        </>
    );
}