export default function getYear() {
    var month : number = new Date().getMonth() 
    var year : number = new Date().getFullYear() 
    return ((month > 8) ? year + 1 : year)
}