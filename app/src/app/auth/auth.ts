
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
export interface LoginFormData {
    email: string,
    password: string
}

export interface RegisterFormData {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export async function logout() {
    cookies().set('session', '', {expires: new Date(0)})
}

export async function getSession() {
    const session = cookies().get('session')?.value
    console.log('SESSION: ', session)
    if(!session) return null
    try {
        const decoded = jwt.decode(session)
        return decoded
    } catch (error) {
        console.log(error)
        return null
    }
}