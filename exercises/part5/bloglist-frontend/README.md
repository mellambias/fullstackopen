# Parte 5

## Ejercicios 5.1.-5.4

Ahora crearemos un frontend para el backend de la lista de blogs que creamos en la última parte. Puedes usar esta aplicación de GitHub como base para tu solución. Debes conectar tu backend con un proxy como se muestra en la parte 3.

Es suficiente con enviar tu solución terminada. Puedes hacer un commit después de cada ejercicio, pero eso no es necesario.

Los primeros ejercicios revisan todo lo que hemos aprendido sobre React hasta ahora. Pueden ser un desafío, especialmente si tu backend está incompleto. Podría ser mejor usar el backend de la respuesta modelo de la parte 4.

Mientras realizas los ejercicios, recuerda todos los métodos de depuración de los que hemos hablado, especialmente mirar a la consola.

>Advertencia: Si notas que estás mezclando los comandos async/await y then, hay un 99.9% de probabilidades de que estés haciendo algo mal. Utiliza uno u otro, nunca ambos.

### 5.1: Frontend de la Lista de Blogs, paso 1

Clona la aplicación de GitHub con el comando:

```shell
git clone https://github.com/fullstack-hy2020/bloglist-frontend
```

Elimina la configuración de git de la aplicación clonada

```shell
cd bloglist-frontend   // ve al repositorio clonado
rm -rf .git
```

La aplicación se inicia de la forma habitual, pero primero debes instalar sus dependencias:

```shell
npm install
npm run devc
```

Implementa la funcionalidad de inicio de sesión en el frontend.

- El token devuelto con un inicio de sesión exitoso se guarda en el estado `user` de la aplicación.
- Si un usuario no ha iniciado sesión, solo se verá el formulario de inicio de sesión.

![navegador mostrando solamente el formulario de login](images/image-1.png)

Si el usuario ha iniciado sesión, se muestra el nombre del usuario y una lista de blogs.

![navegador mostrando blogs y a quien ha iniciado sesión](images/image-2.png)

Los detalles del usuario que inició sesión no tienen que guardarse todavía en el _local storage_.

>NB Puedes implementar el renderizado condicional del formulario de inicio de sesión así, por ejemplo:

```jsx
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          //...
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

```

### 5.2: Frontend de la Lista de Blogs, paso 2

Haz que el inicio de sesión sea "permanente" mediante el use de _local storage_. También implementa una forma de cerrar sesión.

![navegador mostrando botón de logout luego de iniciar sesión](images/image-3.png)
Asegúrate de que el navegador no recuerde los detalles del usuario después de cerrar la sesión.

### 5.3: Frontend de la Lista de Blogs, paso 3

Expande tu aplicación para permitir que un usuario que haya iniciado sesión agregue nuevos blogs:

![navegador mostrando formulario de nuevo blog](images/image-4.png)

#### 5.4: Frontend de la Lista de Blogs, paso 4

Implementa notificaciones que informen al usuario sobre operaciones exitosas y no exitosas en la parte superior de la página. Por ejemplo, cuando se agrega un nuevo blog, se puede mostrar la siguiente notificación:

![navegador mostrando notificación de operación exitosa](images/image-5.png)
Un inicio de sesión fallido puede mostrar la siguiente notificación:

![navegador mostrando notificación de intento de login fallido](images/image-6.png)
Las notificaciones deben estar visibles durante unos segundos. No es obligatorio agregar colores.
