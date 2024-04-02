import { useSelector } from "react-redux"
import jwt from 'jsonwebtoken'

const useSession = () => {
    const session = useSelector((state: any) => state.auth.session)
    if (!session) return {isAuthenticated: false, session}
    try {
        jwt.verify(session, 'secret')
        return {isAuthenticated: true, session}
    } catch (error) {
        return {isAuthenticated: false, session}
    }
}

export default useSession