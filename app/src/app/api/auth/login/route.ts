

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const loginResponse = await axios.post(`${process.env['CODECLA_BACKEND']}/api/auth/managers/login`, data)
        return NextResponse.json(loginResponse.data, {
            status: loginResponse.status,
        })
    } catch (error) {
        return NextResponse.json({status: 'error', message: 'Could not authenticate user'}, {
            status: 500,
        })
    }

}

