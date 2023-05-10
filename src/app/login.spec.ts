import { login } from "./login"


describe('login function' , ()=>{


    it('it can return true' , ()=>{
        expect(login('badran' , 256)).toBeTrue();
    })

    it('it can return false' , ()=>{
        expect(login('badran' , undefined)).toBeFalse();
    })
    
    
    



}) 