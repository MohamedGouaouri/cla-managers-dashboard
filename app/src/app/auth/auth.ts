
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

export async function login(formData: LoginFormData) {
    // TODO: Call auth service login to claim a token
    const session = jwt.sign({email: formData.email}, 'secret', {
        expiresIn: '1d'
    })
    cookies().set('session', session, {expires: new Date(Date.now() + 10 * 1000), httpOnly: true})
    return {
        error: null,
        data: session,
    }
}

export async function logout() {
    cookies().set('session', '', {expires: new Date(0)})
}

export async function getSession() {
    const session = cookies().get('session')?.value
    if(!session) return null
    try {
        const decoded = jwt.decode(session)
        console.log(decoded)
        return decoded
    } catch (error) {
        console.log(error)
        return null
    }
}