export function login(userName:any , password:any):boolean 
{
    if (userName && password) 
    {
        return true
    }
    else
    {
        return false
    }
}