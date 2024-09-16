# Ejercicios 5.17.-5.23

En los últimos ejercicios de esta parte, hagamos algunas pruebas E2E para la aplicación de blog. El material anterior debería ser suficiente para hacer la mayoría de los ejercicios. Sin embargo, definitivamente deberías leer la documentación de Playwright y la descripción de la API, al menos las secciones mencionadas al final del capítulo anterior.

## 5.17: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 1

Crea un nuevo proyecto npm para pruebas y configura Playwright allí.

- Haz una prueba para asegurarte de que la aplicación muestra el formulario de inicio de sesión por defecto.

El cuerpo de la prueba debería ser el siguiente:

```js
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // ...
  })
})
```

## 5.18: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 2

- Realiza pruebas para iniciar sesión.
- Prueba los intentos de inicio de sesión exitosos
- y los no exitosos.
- Crea un nuevo usuario en el bloque `beforeEach` para las pruebas.

El cuerpo de las pruebas se extiende de la siguiente manera

```js
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // vacía la base de datos aquí
    // crea un usuario para el backend aquí
    // ...
  })

  test('Login form is shown', async ({ page }) => {
    // ...
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // ...
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ...
    })
  })
})
```

El bloque `beforeEach` debe vaciar la base de datos utilizando, por ejemplo, el método de formateo que usamos en el [material](https://fullstackopen.com/es/part5/pruebas_de_extremo_a_extremo_playwright#controlando-el-estado-de-la-base-de-datos).

## 5.19: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 3

- Crea una prueba que compruebe que un usuario que ha iniciado sesión puede crear un nuevo blog.

El cuerpo de la prueba podría ser el siguiente

```js
describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    // ...
  })

  test('a new blog can be created', async ({ page }) => {
    // ...
  })
})
```

La prueba debe garantizar que un nuevo blog es visible en la lista de todos los blogs.

## 5.20: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 4

- Haz una prueba que compruebe que el blog puede editarse.

## 5.21: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 5

- Realiza una prueba para asegurarte de que el usuario que creó un blog pueda eliminarlo.

>Si utilizas el dialogo `window.confirm` en la operación de eliminación, quizás tengas que bucar "como usar el dialogo en las pruebas de Playwright"

## 5.22: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 6

- Realiza una prueba para asegurarte de que solo el creador puede ver el botón `delete` de un blog, y nadie más.

## 5.23: Pruebas de Extremo a Extremo de la Lista de Blogs, paso 7

- Realiza una prueba que verifique que los blogs estén ordenados de acuerdo con los likes, el blog con más likes en primer lugar.

>Este ejercicio puede ser un poco más complicado que los anteriores.

Este fue el último ejercicio de esta parte, y es hora de enviar tu código a GitHub y marcar los ejercicios que has completado en el [sistema de envío de ejercicios](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).
