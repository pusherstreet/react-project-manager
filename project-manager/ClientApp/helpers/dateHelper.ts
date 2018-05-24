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
export const getDateDiffInDays = (date1, date2) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let utc2 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let utc1 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1 ;
}