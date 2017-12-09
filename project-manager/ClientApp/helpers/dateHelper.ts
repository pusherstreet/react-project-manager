export const toInputDate = (date: Date): string => {

    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    
    return date.getFullYear()+"-"+(month)+"-"+(day) ;
}
export const toInputTime = (date: Date): string => {
    const h = checkTime(date.getHours());
    const m = checkTime(date.getMinutes());
    return `${h}:${m}`;
}
export const GetDateTime = (date: string, time: string): string => {
    return `${date} ${time}`;
}

const checkTime = (i: any): string => {
    if (i < 10) i = "0" + i; 
    return i;
}