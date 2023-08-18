import {Link, useRouteError} from "react-router-dom";

const Error = ()=>{
    const error = useRouteError();
    return(
        <div className="text-3xl font-bold p-10">
            <h1 className="text-red-400 "> 🔴 Oops! The Page you are looking for is not present!!</h1>
            <h3 className="text-red-400">{error.status} {error.data}</h3>
            <button className=" p-2 m-2 bg-yellow-300 rounded-lg"> 
                <Link to="/"> Back Home </Link>
            </button>
        </div>
    )
}
export default Error;