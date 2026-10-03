import bcrypt from 'bcrypt'
import { query } from '../utils/db'

export default eventHandler(async (event) => {
    const { name, email, password } = await readBody(event)

    if (!name || !email || !password) {
        throw createError({
            statusCode: 400,
            message: "Todos los campos son requeridos"
        })
    }

    try {
        const userExist = await query("SELECT id FROM tbl_users WHERE email = $1", [email])

        if (userExist.rows.length > 0) {
            throw createError({
                statusCode: 400,
                message: "El correo ya esta registrado"
            })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const result = await query("INSERT INTO tbl_users (name, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING id, name, email, role", [name, email, passwordHash])

        const newUser = result.rows[0]

        return { message: "Usuario registrado exitosamente", user: newUser }

    } catch (error) {
        console.log(error)

        throw createError({
            statusCode: 500,
            message: "Error al registrar el usuario"
        })
    }
})