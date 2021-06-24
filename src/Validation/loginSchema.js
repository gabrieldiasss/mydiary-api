const yup = require("yup")

const loginSchema = yup.object({

    email: yup.string().required("Todos os campos devem ser preenchidos!").email("Email está mal formatado."),
    password: yup.string().required("Todos os campos precisam ser preenchidos!")

})

loginSchema.validate()

module.exports = loginSchema