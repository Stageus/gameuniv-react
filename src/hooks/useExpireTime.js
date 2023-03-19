export const getItemWithExpireTime = (key_name) =>{

    const objString = window.localStorage.getItem(key_name)

    if(!objString){
        return null
    }

    const obj = JSON.parse(objString)

    if(Date.now() > obj.expire){
        window.localStorage.removeItem(key_name)

        return null
    }

    return obj.value


}