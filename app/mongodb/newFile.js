export async function getData(){
  const response = await fetch('https://data.mongodb-api.com/app/data-ojbye/endpoint/data/v1/action/findOne');
  const data = response.json();
  return data;
}