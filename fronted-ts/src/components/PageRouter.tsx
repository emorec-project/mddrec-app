import {Outlet,Link} from "react-router-dom"
import Results from "./Results";

const PageRouter = () => {
    return (
        <>
        <nav>
            <ul>
                <li>
                    <Link to="/results" >results</Link>
                </li>
                <li>
                    <Link to="/sessions_recorder" >sessions recorder</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default PageRouter;