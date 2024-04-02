import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  return NextResponse.json({});
}

export async function GET(request: NextRequest) {
  const response = await axios.get('http://localhost:3333/challenges')
  return NextResponse.json(response.data);
}