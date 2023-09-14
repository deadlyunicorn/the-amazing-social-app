export const formatDate = (date:Date)=>{
  const postDay = date.getDate() < 10 ? '0' + date.getDate() :String(date.getDate());
  const postMonth = date.getMonth()+1 < 10 ?'0' + (date.getMonth()+1):String(date.getMonth()+1);
  const postYear = date.getFullYear();

  return `${postDay}/${postMonth}/${postYear}`;
}