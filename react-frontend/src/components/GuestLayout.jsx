import { Outlet, Navigate } from "react-router"
import { useStateContext } from "./contexts/ContextProvider"

export default function GuestLayout() {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/" />

    }
    return (

        <div>
            <div>
                GuestLayout
                <Outlet />
            </div>

        </div>
    )
}
