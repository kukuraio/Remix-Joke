export default function New() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-[50%] mt-10">
                <h1 className="text-6xl leading-8 mb-6">JOKES</h1>
                <h2 className="text-2xl">Add your own hilarious joke.</h2>
                <form method="POST">
                    <div>
                    <label htmlFor="name" className="">Name:</label>
                    <input id="name" type="text" className="border-2 border-gray-800"/>
                    </div>
                    <div>
                    <label htmlFor="content" className="">Content:</label>
                    <input id="content" type="text-area" className="border-2 border-gray-800" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-700">Submit</button>
                </form>
            </div>
        </div>
    )
}