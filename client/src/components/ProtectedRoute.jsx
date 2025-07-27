import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    return children;
}
export const AuthenticatedUser = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(isAuthenticated){
        return <Navigate to="/"/>
    }

    return children;
}

export const AdminRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if(user?.role !== "instructor"){
        return <Navigate to="/"/>
    }

    return children;
}

// In ProtectedRoutes.js
export const InstructorRoute = ({ children }) => {
  const { auth } = useAuth();
  
  if (!auth.user) return <Navigate to="/login" />;
  if (auth.user.role !== 'instructor') return <Navigate to="/" />;
  
  return children;
};