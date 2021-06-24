const yup = require("yup")

const postSchema = yup.object().shape({
    title: yup.string().required("Todos os campos devem ser preenchidos!").max(40, "Título deve ter menos que 40 caracteres"),
    content: yup.string().required("Todos os campos devem ser preenchidos!")
})

postSchema.validate()

module.exports = postSchema