import { Outlet, Navigate } from "react-router"
import { useStateContext } from "./contexts/ContextProvider"
import { Link } from "react-router-dom";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
         ev.preventDefault();
    }

    return (


        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users </Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header

                    </div>
                    <div>
                        { user.name}
                        <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>

            </div>
        </div>


    )
}
