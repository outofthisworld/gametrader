function authenticate({check,errorMessage}){
    if(!check) throw new Error('check function must be supplied to authenticate');
    if(!Array.isArray(check) && typeof check !== 'function') throw new Error('invalid type for check');
    console.log('calling this')
    return (target,key,descriptor)=>{
        console.log('Target:',target,'Key:',key,'Descriptor:',descriptor)

        if(!descriptor.writable){
            throw new Error('Cannot write to to property ' + key)
        }else{
            const originalFunc = target[key]
            descriptor.initializer = ()=>{
                return target[key]= (...args)=>{
                    console.log(args)
                    const context = args[2];
                    const pass = Array.isArray(check)? check.filter((f)=>typeof f === 'function').every((f)=>f.call(null,context)):check.call(null,context);
                    if(pass){
                        return originalFunc.apply(null,args);
                    }else{
                        throw new Error(errorMessage || 'You must be authenticated.');
                    }
                }
            }
        }
    }
}

const isLoggedOn = (context)=>{
    return context.user;
}

export default {
    Query:{  
        users:()=>({}),
        games:()=>({}),
        reviews:()=>({})
    },
    Mutation:{
        users:()=>({})
    },
    UserQueries:{
        @authenticate({check:isLoggedOn,errorMessage:"Please authenticate"})
        getUsers:(_,input,req)=>{
            return [{
                username:"hello",
                password:"boo",
                email:"someemail.com"
            }]
        }
    },
    UserMutations:{
        createUser:(_,input,context)=>{

        }
    }
}