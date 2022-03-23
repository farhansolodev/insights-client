import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function ProtectedRoute({ component: RouteComponent, ...rest }) {
    const { currentUser } = useAuth();
    // console.log("went thru protected route", currentUser)
    return (
        <Route
            {...rest}
            render={ routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};