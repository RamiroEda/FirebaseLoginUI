# Pruebas

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
