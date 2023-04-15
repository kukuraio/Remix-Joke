import { db } from "../utils/db.server"
import { redirect, createCookieSessionStorage } from "@remix-run/node" 
import {useActionData} from '@remix-run/react'
import bcrypt from "bcryptjs";


export default function Login() {
    const msg = useActionData()

    return (
        <div className="flex justify-center">
            {msg?.msg && <p>{msg.msg}</p> }
            <div className="flex flex-col mt-20 w-[40%] items-center rounded-md border-1 border-gray-800 bg-white text-black leading-8">
                <h1 className="text-6xl font-extrabold">Login</h1>
                <form method="POST">

                    <div>
                    <label htmlFor="name">Name:</label><br />
                        <input type="text" id="name" name="name" className="border-2 border-gray-600 rounded-md" />
                    </div>

                    <div>
                    <label htmlFor="password">Password</label><br />
                        <input type="text" id="password" name="password" className="border-2 border-gray-600 rounded-md" />
                    </div>

                    <button type="submit" className="bg-blue-800 hover:bg-blue-600 transition-colors text-white rounded-md px-4 py-2">submit</button>
                </form>
            </div>

        </div>
    )
}

export async function action({request}) {
    const formData = await request.formData()
    const f_data = Object.fromEntries(formData)

    const search = await db.user.findUnique({where: {username: f_data.name}})
    if(!search) {
        return {msg: "User not found. Please try again."}
    }

    const isCorrectPassword = await bcrypt.compare(
        f_data.password,
        search.passwordHash
      );
      if (!isCorrectPassword) return null
      else {
        const sessionSecret = "48HA65BG1";
        if (!sessionSecret) {
        throw new Error("SESSION_SECRET must be set");
        }

        const storage = createCookieSessionStorage({
            cookie: {
              name: "RJ_session",
              secure: process.env.NODE_ENV === "production",
              secrets: [sessionSecret],
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 60 * 24 * 30,
              httpOnly: true,
            },
          });
          const session = await storage.getSession();
            session.set("userId", search.id);
            return redirect('/jokes', {
                headers: {
                "Set-Cookie": await storage.commitSession(session),
                },
            });
        }
    
    
    
    /*const search = await db.user.findFirst({where: {
        username: f_data.name,
        passwordHash: f_data.password
    }})

    if(!search?.username && !search?.passwordHash) {
        return {msg: "User not found. Please try again."}
    }
    else {
       return redirect('/jokes')
    } */

} 