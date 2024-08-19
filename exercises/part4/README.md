# Parte 4

>Nota: el material de este curso fue escrito con la version v20.11.0. Por favor asegúrate de que tu version de Node es al menos tan nueva como la version utilizada en el material (puedes chequear la version al ejecutar node -v en la linea de comandos).

En los ejercicios de esta parte, crearemos una aplicación de lista de blogs, que permite a los usuarios guardar información sobre blogs interesantes con los que se han encontrado en Internet. Para cada blog listado, guardaremos el autor, el título, la URL y la cantidad de votos positivos de los usuarios de la aplicación.

## 4.1 Lista de Blogs, paso 1

Imaginemos una situación en la que recibes un correo electrónico que contiene el siguiente cuerpo de la aplicación e instrucciones:

```js
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

- Convierte la aplicación en un proyecto _npm funcional_.
- Para mantener tu desarrollo productivo, configura la aplicación para ejecutarse con **nodemon**.
- Puedes crear una nueva base de datos para tu aplicación con MongoDB Atlas o utilizar la misma base de datos de los ejercicios de la parte anterior.

Verifica que sea posible

- Agregar blogs a la lista con Postman o el cliente REST de VS Code y que
- la aplicación devuelva los blogs añadidos en el endpoint correcto.

## 4.2 Lista de Blogs, paso 2

Refactoriza la aplicación en _módulos separados_ como se mostró anteriormente en esta parte del material del curso.

>NB refactoriza tu aplicación en pequeños pasos y verifica que funcione después de cada cambio que realices.
Si intentas tomar un "atajo" refactorizando muchas cosas a la vez, entonces la ley de Murphy se activará y es
 casi seguro que algo se romperá en tu aplicación.
El "atajo" terminará tomando más tiempo que avanzar lenta y sistemáticamente.

Una de las mejores prácticas es hacer un _commit de tu código cada vez que está en un estado estable_. Esto facilita retroceder a una situación donde la aplicación aún funciona.

Si estás teniendo problemas con **content.body** siendo `undefined` sin razón aparente, asegúrate de no haber olvidado agregar `app.use(express.json())` cerca de la parte superior del archivo.
