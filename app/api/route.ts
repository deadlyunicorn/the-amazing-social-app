
const { NextResponse } = require ('next/server');


const key = 'c3UPNRuPNcz2wtM8kB42pJYv9yTiKK9AL0OFXZuhqNBLxrIYz4fctc51ffxGFxiS'

export async function GET(){
  const res = await fetch('https://data.mongodb-api.com/app/data-ojbye/endpoint/data/v1',{
    headers: {
      'Content-Type': 'application/json',
      'API-Key' : key,
    },
  });
  const data = await res.json();
  return NextResponse.json({data})
}

