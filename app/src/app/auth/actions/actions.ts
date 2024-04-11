'use server'

import axios from "axios";


interface LoginResponse {
    status: string;
    message?: string;
    token?: string
}

interface RegistrationResponse {
    status: string;
    message?: string;
}

export async function login(data: any): Promise<LoginResponse> {
    console.log(data)
    try {
        const response =  await axios.post(`${process.env['CODECLA_BACKEND']}/api/auth/managers/login`, data)
        return response.data
    } catch (error) {
        return {status: 'error', message: 'Could not authenticate user'}
    }
}
export async function registerManager(data: any): Promise<RegistrationResponse> {
    console.log(data)
    try {
        const response =  await axios.post(`${process.env['CODECLA_BACKEND']}/api/auth/managers/register`, data)
        return response.data
    } catch (error) {
        return {status: 'error', message: 'Could not register user'}
    }
}