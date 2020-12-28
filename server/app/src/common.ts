export function adminLog(message:string){
    if(process.env.ADMIN=="admin") console.log(message)
}