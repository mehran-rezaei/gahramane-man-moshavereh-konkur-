import Cookies from "js-cookie";

export function setCookie(key, value){
    Cookies.set(key, value, { expires : 14 });
}

export function getCookie(key){
    return Cookies.get(key);
}