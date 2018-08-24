

export default async (prom)=>{
    try{
        const result = await prom;
        return [null,result];
    }catch(err){
        return [err,null]
    }
}