export const formatDate = (date:Date)=>{
  const postDay = date.getDate() < 10 ? '0' + date.getDate() :String(date.getDate());
  const postMonth = date.getMonth()+1 < 10 ?'0' + (date.getMonth()+1):String(date.getMonth()+1);
  const postYear = date.getFullYear();

  return `${postDay}/${postMonth}/${postYear}`;
}

export const formatDateUTC = (date:Date)=>{
  const day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() :String(date.getUTCDate());
  const month = date.getUTCMonth()+1 < 10 ?'0' + (date.getUTCMonth()+1):String(date.getUTCMonth()+1);
  const year = date.getUTCFullYear();

  return `${year}_${month}_${year}`;

}