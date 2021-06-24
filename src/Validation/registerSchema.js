const yup = require("yup")

const registerSchema = yup.object({

    username: yup.string().required("Todos os campos devem ser preenchidos!").max(15, "Seu nome de usuário deve ter menos que 15 caracteres!"),
    email: yup.string().required("Todos os campos devem ser preenchidos!").email("Email está mal formatado."),
    password: yup.string().required("Todos os campos precisam ser preenchidos!").min(6, "Sua senha deve ter no minímo 6 caracteres!")
})

registerSchema.validate()

module.exports = registerSchema