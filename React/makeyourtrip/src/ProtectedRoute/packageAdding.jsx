import { Navigate } from "react-router-dom";

function PackageAddingProtected({token,children})
{
    token=sessionStorage.getItem("decodedToken");
    if(token!=null)
        return children;
    return <Navigate to='/' />
}

export default PackageAddingProtected;