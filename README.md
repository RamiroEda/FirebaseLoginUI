# FirebaseLoginUI

Este proyecto permite a un usuario registrado poder aplicar el filtro Grayscale a las fotos que sube a la aplicación web.

Este proyecto fue generado por [Angular CLI](https://github.com/angular/angular-cli) versión 9.0.2.

## [DEMO](https://pruebas-354cc.firebaseapp.com/)

## Servidor de desarrollo

Correr `ng serve` para correr un servidor de desarrollo. Para acceder abrir `http://localhost:4200/` en el navegador.

## Subir a Firebase

Correr `ng deploy` para desplegar el proyecto en Firebase.

## Componentes

### Login
| Elemento    | Directorio                                     |
|-------------|------------------------------------------------|
| Directorio  | `src/app/components/login`                     |
| Vista       | `src/app/components/login/login.component.html`|  
| Controlador | `src/app/components/login/login.component.ts`  |
| Estilos     | `src/app/components/login/login.component.scss`|

### Index
| Elemento    | Directorio                                     |
|-------------|------------------------------------------------|
| Directorio  | `src/app/components/index`                     |
| Vista       | `src/app/components/index/index.component.html`|  
| Controlador | `src/app/components/index/index.component.ts`  |
| Estilos     | `src/app/components/index/index.component.scss`|

Al empezar esta página se descarga la información del usuario desde el método `initAll()`. Si el usuario inició sesión desde Google se reemplazará su nombre y foto de perfil por las de Google en vez de usar el nombre por defecto de la base de datos.

Al seleccionar un archivo se ejecutará el método `uploadFile()` que mostrará la imagen y esperará a que la función `applyFilter` transforme la imagen a Grayscale después de subirse.

## Rutas
| Elemento    | Directorio                       |
|-------------|----------------------------------|
| Directorio  | `src/app/app-routing.module.ts`  |


| Elemento    | Ruta      | Condiciones                                                 |
|-------------|-----------|-------------------------------------------------------------|
| Login       | `/login`  | No tener una sesión iniciada. Sino, se redirecciona a Index |
| Index       | `/index`  | Tener una sesión iniciada. Sino, se redirecciona a Login    |

## Modelos

### UserInfo
| Elemento    | Directorio                       |
|-------------|----------------------------------|
| Directorio  | `src/app/models/user-info.ts`    |

```tsx
export interface UserInfo {
    name: string,
    imageUrl: string,
    backgroundImage: string
}
```
