import { Link } from "@remix-run/react"
import { db } from "../utils/db.server"
import {useLoaderData, useActionData} from '@remix-run/react'            


type Data = {
    id: string;
    name: string;
    content: string;
}

export async function loader() {
    const data = await db.joke.findMany()
    
    return data
}
function ShowJoke(a: string) {
  document.getElementById('d_joke')!.style.display = 'flex';
  document.getElementById('jk')!.innerHTML = a;
}

function HideJoke() {
  document.getElementById('d_joke')!.style.display = 'none'
}

export default function Joke() {
    const data = useLoaderData()
    const msg = useActionData()
    
    return (
        <div>
            <h1 className="text-4xl font-extrabold ml-2 mt-10 mb-10">JOKES</h1>
            {msg?.user && <p>{msg.user}</p>}
            <div className="flex justify-around">
           
            <div className="flex flex-col w-[50%]">
            <p className="mb-10 text-4xl">Get a random joke.</p>
            <p className="mb-6 text-lg">Here are a few more jokes to check out:</p>
            <ul className="relative">
            {
                data.map((obj:Data) => {
                    return <li key={obj.id}><button className="border-2 border-blue-900 hover:border-b-2 hover:border-b-pink-600 transition" onClick={() => ShowJoke(obj.content)}>{obj.name}</button></li>
                })
            }
            <div className="hidden flex-col absolute rounded-md top-0 left-0 w-[100%] h-auto pb-4 transition-transform bg-black" id='d_joke'>
          <button onClick={HideJoke} className="text-lg text-white">X</button>
          <p id='jk' className="text-md"></p>
        </div>

        </ul>
       
        <Link to="/newjoke" className="bg-pink-700 px-2 py-4 w-[20%] font-extrabold text-center round-full">ADD YOU OWN</Link>
    </div>
            
            <div className="w-[40%]">
            <p className="mb-4">Here's a random joke:</p>
            <p>I was wondering why the frisbee was getting bigger, then it hit me.</p>
           
            </div>
            </div>
        </div>
    )
}
