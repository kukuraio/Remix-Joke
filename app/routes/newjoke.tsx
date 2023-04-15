import { db } from "../utils/db.server"
import { redirect } from "@remix-run/node" 
import {useActionData, useLoaderData} from '@remix-run/react'

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


export default function New() {
    const data = useLoaderData()
    const data2 = useActionData()
    
    return (
        <div className="flex justify-around pb-10">
           
            <div className="flex flex-col w-[40%] pt-10">
                <p className="mb-10 text-4xl">Get a random joke.</p>
                <p className="mb-6 text-lg">Here are a few more jokes to check out:</p>
                <ul className="relative text-lg leading-8">
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
      
            </div>


            <div className="flex flex-col w-[40%] mt-10">
                <h2 className="text-2xl pb-10">Add your own hilarious joke.</h2>
                <form method="POST">
                    <div className="pb-10">
                    <label htmlFor="name" className="">Name:</label> <br />
                    <input id="name" name="name" type="text" className="text-black border-1 border-gray-800 w-[60%] h-[7vh] rounded-full"/>
                    {data2?.message && <p>{data2.message}</p>}
                    </div>
                    <div className="pb-10">
                    <label htmlFor="content" className="">Content:</label> <br />
                    <textarea id="content" name="content" className="text-black border-1 border-gray-800 w-[60%] h-[10vh] rounded-md"></textarea>
                    </div>
                    {data2?.message2 && <p>{data2.message2}</p>}
                    <button type="submit" className="px-4 py-2 bg-blue-900 hover:bg-blue-600 transition">Submit</button>
                </form>
            </div>
        </div>
    )
}


export async function action({request}) {
    const formData = await request.formData()
    const f_data = Object.fromEntries(formData)
    
    if(f_data.name.trim().length < 5) {
        return {message: "Joke title is too short, must be at least 6 characters long."}
    }
    if(f_data.content.length < 20) {
        return {message2: "Joke is too short, must be at least 10 characters long."}
    }

    await db.joke.create({data: {
        name: f_data.name,
        content: f_data.content
    }})

    return redirect('/jokes')

} 