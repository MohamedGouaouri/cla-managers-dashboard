import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({});
}


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id)
  try{
    const resp = await axios.get(`http://localhost:3333/challenges/${params.id}`)
    console.log(resp.status)
    if (resp.status === 200) {
      return NextResponse.json({
        status: 'success',
        data: resp.data
      });
    }
    return NextResponse.json({
      status: 'error',
      message: resp.data
    });
  } catch(error: any) {
    console.error(error.message)
    return NextResponse.json({
      status: 'error',
      message: error
    }, {
      status: 404
    });
  }
  
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try{
    const resp = await axios.delete(`http://localhost:3333/challenges/${params.id}`)
    if (resp.status === 200) {
      return NextResponse.json({
        status: 'success',
        message: 'Deleted'
      });
    }
    return NextResponse.json({
      status: 'error',
      message: resp.data
    });
  } catch(error: any) {
    console.error(error.message)
    return NextResponse.json({
      status: 'error',
      message: error
    }, {
      status: 404
    });
  }
  
}
