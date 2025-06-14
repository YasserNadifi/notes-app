import axios from 'axios';

export const verifyJwt=async(token)=>{
    try{
        const response=await axios.post("http://localhost:8080/verifyJwt",{token:token},
            {
            headers: {
                'Content-Type': 'application/json'
            }});
        console.log("response.data : "+response.data.token)
        if (response.data.token=='valid'){
            console.log("verify token : if");
            return true;
        } else {
            console.log("verify token : else");
            
            return false;
        }
    } catch(e){
        console.log("verify token : catch");
        console.error(e)
        return false;
    }
}