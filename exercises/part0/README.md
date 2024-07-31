# Ejercicios parte 0

## 0.1: HTML

Revisa los conceptos básicos de HTML leyendo este tutorial de Mozilla: [tutorial de HTML](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/HTML_basics).

Este ejercicio no se envía a GitHub, leer el tutorial es suficiente

## 0.2: CSS

Revisa los conceptos básicos de CSS leyendo este tutorial de Mozilla: [tutorial de CSS](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/CSS_basics).

Este ejercicio no se envía a GitHub, leer el tutorial es suficiente

## 0.3: Formularios HTML

Aprende sobre los conceptos básicos de los formularios HTML leyendo el tutorial de Mozilla [Mi primer formulario HTML](https://developer.mozilla.org/es/docs/Learn/Forms/Your_first_form).

Este ejercicio no se envía a GitHub, leer el tutorial es suficiente

## 0.4: Nuevo diagrama de nota

En el capítulo [Cargando una página que contiene JavaScript - revisión](https://fullstackopen.com/es/part0/fundamentos_de_las_aplicaciones_web#cargando-una-pagina-que-contiene-java-script-revisada) la cadena de eventos causada al abrir la página <https://studies.cs.helsinki.fi/exampleapp/notes> se representa como un [diagrama de secuencia](https://www.geeksforgeeks.org/unified-modeling-language-uml-sequence-diagrams/)

El diagrama se hizo como un archivo Markdown de Github usando la sintaxis [Mermaid](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams), de la siguiente manera:

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

Crea un diagrama similar que describa la situación en la que el usuario crea una nueva nota en la página <https://studies.cs.helsinki.fi/exampleapp/notes> escribiendo algo en el campo de texto y haciendo clic en el botón Save.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document notes.html
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the main.css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file main.js
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.5: Diagrama de aplicación de una sola página

Crea un diagrama que describa la situación en la que el usuario accede a la versión de aplicación de una sola página de la aplicación de notas en <https://studies.cs.helsinki.fi/exampleapp/spa>.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser-->server:GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document spa.html
    deactivate server

    browser-->server:GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS document
    deactivate server

    browser-->server:GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: spa.js document
    deactivate server

    browser-->server:GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: json data document
    deactivate server
```

## 0.6: Nueva nota en diagrama de aplicación de una sola pagina

Crea un diagrama que represente la situación en la que el usuario crea una nueva nota utilizando la versión de una sola página de la aplicación.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser-->server:POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: {content: "nuevo texto", date: "2024-07-31T16:51:28.412Z"}
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
```
