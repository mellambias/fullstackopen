# Parte 5

## [Iniciar sesión en la interfaz](https://fullstackopen.com/es/part5/iniciar_sesion_en_la_interfaz)

iniciamos el servidor de la parte 3-4 y el entorno de desarrollo de la parte 5

- Controlando el inicio de sesión
- Creando nuevas notas
- Guardando el token en el local storage del navegador
- Ejercicios 5.1.-5.4.
- Nota sobre el uso de local storage

## [props.children y proptypes](https://fullstackopen.com/es/part5/props_children_y_proptypes)

- Mostrando el formulario de inicio de sesión solo cuando sea apropiado
- Los componentes hijos, también conocidos como **props.children**
- Estado de los formularios
- Referencias a componentes con **ref**
- Un punto sobre los componentes
- El juramento actualizado del desarrollador full stack

  El desarrollo full stack es extremadamente difícil, por eso utilizaré todos los medios posibles para hacerlo lo más fácil posible
  - Mantendré abierta la consola de desarrollo del navegador todo el tiempo
  - Utilizaré la pestaña _network_ para asegurarme de que el _frontend_ y el _backend_ estén comunicándose como espero
  - Monitorizaré el **estado del servidor** para asegurarme de que los datos enviados por el _frontend_ se guarden allí como espero
  - Monitorizaré la **base de datos**: ¿el _backend_ guarda los datos allí en el formato correcto?
  - Progresaré con pequeños pasos
  - cuando sospeche que hay un error en el _frontend_, me asegurare de que el _backend_ funcione correctamente
  - cuando sospeche que hay un error en el _backend_, me asegurare de que el _frontend_ funcione correctamente
  - Escribiré muchos **console.log** para asegurarme de entender cómo se comportan el código y las pruebas y para ayudar a localizar problemas
  - Si mi código no funciona, no escribiré más código. En cambio, empezare a eliminarlo hasta que funcione o simplemente regresare a un estado en el que todo funcionaba
  - Si una prueba no pasa, me asegurare de que la funcionalidad probada funciona correctamente en la aplicación
  - Cuando pida ayuda en el canal de Discorddel curso o en cualquier otro lugar, formularé mis preguntas correctamente, [consulta aquí cómo pedir ayuda](https://fullstackopen.com/es/part0/informacion_general#como-obtener-ayuda-en-discord)
- Ejercicios 5.5.-5.11.
- PropTypes
  El paquete **prop-types** permite definir las `props` que el componente necesita
- ESlint
- Ejercicio 5.12

## [Probando aplicaciones React](https://fullstackopen.com/es/part5/probando_aplicaciones_react)

Comencemos instalando **Vitest** y la librería **jsdom** que simula un navegador web y algunas librerias que ayudan al renderizado de componentes

```shell
pnpm add --save-dev vitest jsdom
pnpm add --save-dev @testing-library/react @testing-library/jest-dom
```

- Renderizando el componente para pruebas
- Ubicación del archivo de prueba
- Búsqueda de contenido en un componente
- Depurando pruebas
- Clicando botones en las pruebas

```shell
pnpm add --save-dev @testing-library/user-event
```

- Pruebas para el componente Togglable
- Probando los formularios
- Sobre la búsqueda de elementos
- Cobertura de las pruebas
- Ejercicios 5.13.-5.16.
- Pruebas de integración del Frontend
- Pruebas de instantáneas
