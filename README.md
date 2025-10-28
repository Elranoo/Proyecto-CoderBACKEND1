# Ecommerce Server

Este proyecto es un servidor de ecommerce construido con Node.js y Express. Gestiona productos y carritos de compra a través de una API RESTful.

## Estructura del Proyecto

```
ecommerce-server
├── src
│   ├── app.js                # Punto de entrada de la aplicación
│   ├── server.js             # Configuración e inicio del servidor
│   ├── config                # Configuraciones de la aplicación
│   ├── controllers           # Controladores para manejar la lógica de negocio
│   ├── routes                # Rutas de la API
│   ├── services              # Servicios para la lógica de negocio
│   ├── models                # Modelos de datos
│   ├── middlewares           # Middlewares de la aplicación
│   ├── utils                 # Utilidades y funciones de ayuda
│   └── db                   # Lógica de acceso a datos
├── tests                     # Pruebas unitarias
├── package.json              # Configuración del proyecto
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore                # Archivos y carpetas a ignorar
└── README.md                 # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd ecommerce-server
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

1. Configura las variables de entorno en un archivo `.env` basado en el archivo `.env.example`.
2. Inicia el servidor:
   ```
   npm start
   ```
3. La API estará disponible en `http://localhost:8080`.

## Endpoints

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `POST /api/products` - Agregar un nuevo producto
- `PUT /api/products/:id` - Actualizar un producto existente
- `DELETE /api/products/:id` - Eliminar un producto

### Carritos

- `POST /api/carts` - Crear un nuevo carrito
- `GET /api/carts/:id/products` - Obtener productos en un carrito
- `POST /api/carts/:id/products` - Agregar un producto a un carrito

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.