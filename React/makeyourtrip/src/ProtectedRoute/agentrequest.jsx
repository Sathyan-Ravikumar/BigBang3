import { Navigate } from "react-router-dom";

function AgentRequestProtected({token,children})
{
    token=sessionStorage.getItem("decodedToken");
    if(token!=null)
        return children;
    return <Navigate to='/' />
}

export default AgentRequestProtected;