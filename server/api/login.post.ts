import bcrypt from 'bcrypt'
import { query } from "../utils/db"

export default eventHandler(async (event) => {
    const { email, password } = await readBody(event)

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: "Email y contraseña requeridos"
        })
    }

    try {
        const result = await query("SELECT * FROM tbl_users WHERE email = $1", [email])

        const user = result.rows[0]

        if (!user) {
            throw createError({
                statusCode: 401,
                message: "Credenciales invalidas"
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            throw createError({
                statusCode: 401,
                message: "Credenciales invalidas"
            })
        }

        await setUserSession(event, {
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

        return {}

    } catch (error) {
        console.log(error)

        throw createError({
            statusCode: 500,
            message: "Error al iniciar sesion"
        })
    }
})