import { Link } from "@remix-run/react"
import { db } from "../utils/db.server"
import {useLoaderData} from '@remix-run/react'

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


export default function Jokes() {
  const data = useLoaderData()
    return (
        <div className="flex flex-col w-[50%]">
        <p className="mb-10">Get a random joke.</p>
        <p className="mb-6">Here are a few more jokes to check out:</p>
        <ul className="relative">
          {
            data.map((obj:Data) => {
              return <li key={obj.id}><button onClick={() => ShowJoke(obj.content)}>{obj.name}</button></li>
            })
          }
           <div className="hidden flex-col absolute rounded-md top-0 left-0 w-[100%] h-auto pb-4 transition-transform bg-black" id='d_joke'>
          <button onClick={HideJoke} className="text-lg text-white">X</button>
          <p id='jk' className="text-md"></p>
        </div>

        </ul>
       
        <Link to="/newjoke" className="bg-blue-400 px-2 py-4 w-[40%] text-center round-md">ADD YOU OWN</Link>
    </div>
    )
}