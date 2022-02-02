CONFIGURACIÓN DE ENTORNO

1. Instalar Node JS

Entrar a la siguiente url y descargar la versión actual para el sistema operativo
https://nodejs.org/es/

Comprobar la instalación con:
node -v
npm -v

2. Instalar Brew
https://brew.sh/index_es
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


INSTALAR MONGO DB EN WINDOWS
Solo entrar a la pagina y descargar el community server de la version del SO que se prefiera


INSTALAR MONGO DB EN MAC
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

1. Instalar Xcode Command Line
xcode-select --install

Si sale que ya esta instalado entonces actualizarlo
softwareupdate --all --install --force

Si dice que no encuentra ninguna actualización entonces forzarlo
  sudo rm -rf /Library/Developer/CommandLineTools
  sudo xcode-select --install

brew tap mongodb/brew
brew install mongodb-community@5.0

Iniciar Mongo DB
brew services start mongodb/brew/mongodb-community

Detener Mongo DB
brew services stop mongodb-community@5.0

Iniciar el shell de Mongo DB
mongosh



CREAR PROYECTO EN GITHUB

Crear readme con banner
Crear folder para backend
Pararse en la carpeta del backend y el comando npm init


CREAR ALIAS

 vim ~/.bash_profile
En el archivo crear el alias
musify=“cd /ruta”;
:wq para salir y guardar


INSTALAR DEPENDENCIAS

Nota: El —save es para que se guarde la Liberia en el package.json
--save-dev se utiliza para que solo se aplique en ambiente de dev

#Servidor web
npm install express —save

#Dependencia para encriptar las contraseñas de los usuarios
npm install bcrypt-nodejs --save

#Dependencia para parsear a json y poder trabajar la información como objetos
npm install body-parser --save

#Dependencia para subir ficheros por file a traves de http
npm install connect-multiparty --save

#Dependencia para manejar tokenizacion de apis por jwt
npm install jwt-simple --save

#Dependencia para
npm install moment --save

#Dependencia para trabajar con mongodb desde nodejs
npm install mongoose --save

#Dependencia para paginar los resultados de mongodb
npm install mongoose-pagination --save

#Dependencia para refrescar el server cada vez que hacemos un cambio
npm install nodemon --save-dev


############################################################
#                CREAR BASE DE DATOS                       #
############################################################

#Crear base de datos
use musifydb

#Creamos la coleccion artists creando un registro
db.artists.save({name:'Joe Arroyo', description:'Musica tropical',image:'null'});

#Consultamos todos los registros de la coleccion artists
db.artists.find();

1. Realizar la conexion de la base de datos en el index.js
2. Configurar el script de index en el package.json
3. Se ejecuta npm start para inicializar la aplicacion y que el nodemon comience hacer su trabajo
4. En la consola debe mostrar que se conecto a la base de datos


############################################################
#                CREAR SERVIDOR WEB                        #
############################################################

1. Crear el fichero app.js con todas las dependencias que necesita el server y se exporta el module app
2. En el fichero index.js se llama al app, se configura el puerto para levantar al server y se escribe en el console para mostrar una conexion exitosa
3. En app.js se crea una ruta de prueba de get
4. Luego consultamos http://localhost:3977/test y debe retornar el mensaje de bienvenida, en la consola debe mostrar que se levanto el server


############################################################
#                CREAR  MODELOS                            #
############################################################
Nota: Automaticamente mongoose pluraliza los modelos para colecciones, no es necesario colocar la "s"
1. Crear carpeta models
2. Crear un archivo js por cada uno de los modelos (ojo con el orden de creacion por las referencias)

############################################################
#                CREAR CONTROLADOR USER                    #
############################################################
1. Crear la carpeta de controllers
2. Crear el archivo user.js dentro de controllers
3. Construir un metodo de test usando metodo get para probar
4. Crear carpeta routes
5. Crear el archivo user.js dentro de routes
6. Importar el controller en el route y crear una ruta get para invocar el metodo test
7. Incluir la ruta en el archivo app.js
8. Crear un middleware /api dentro del archivo de app.js

9. Crear metodo saveUser en user controller
10.Crear ruta para saveUser en user Route
11.Crear metodo loginUser en user controller
12.Crear ruta para loginUser en user route
13. Crear carpeta services
14. Crear archivo jwt.js y dentro de este crear el metodo create tokenizacion
15. Realizar el import de jwt service en user controller y modificar el metodo para devoler el token si se envie el flag gethash


############################################################
#                CREAR MIDDLEWARE DE AUTHENTICATION        #
############################################################
El middleware de autenticacion se va a usar para forzar a que todas las apis, excepto la de login, se consuman con un token de un user logueado

1. Crear folder middlewares
2. Crear archivo authenticated.js
3. Construir metodo ensureAuth
4. En el archivo user route importar el middleware y cambiar la ruta de test controller para forzar su autenticacion en la invocacion

############################################################
#                CREAR CONTROLADOR USER  - PART II         #
############################################################
1. Crear el metodo updateUser en el user controller
2. Crear la ruta para updateUser en user route forzando a la autenticacion con el middleware
3. Crear folder de uploads y dentro de este un folder de users
4. Crear metodo de uploadImage dentro de user controller
5. Crear un middleware para almacenar todos los files que se carguen a la ruta uploads/users, esto se hace dentro de user route
6. Crear una ruta con el middleware de autenticacion y el middleware de imagenes dentro de user route
7. Crear un metodo para getImage en el user controller

############################################################
#                CREAR CONTROLADOR ARTIST                  #
############################################################
1. se crea el archivo artis.js en controllers y se crea el metodo getArtist
2. se crea el archivo artist.js en routes
3. se crea la ruta en el archivo app.js tanto en el var require como en el base /api
4. Se termina de construir el metodo de getArtist
5. Se crean los metodos en artist controller de saveArtist, updateArtist, deleteArtist, uploadImage, getImageFile basandonos en como lo hicimos con User Controller. 

############################################################
#                CREAR CONTROLADOR ALBUM                   #
############################################################
1. Se crean los ficheros de controlador y route
2. Se crea la carpeta de albums en uploads
3. En album controller se crea el metodo de getAlbum y save album
4. En album route se crean las rutas para los metodos getAlbum y save album
5. en app.js se invocan las nuevas rutas de album
6. Crear metodo getAlbums
6. Crear metodo deleteAlbum
7. Crear metodo uploadImage
8. Crear metodo getImage

############################################################
#                CREAR CONTROLADOR SONG                    #
############################################################
1. Se crean los ficheros de controlador y route
2. Se crea la carpeta de songs en uploads
3. En album controller se crea el metodo de getSong y saveAlbum
4. En album route se crean las rutas para los metodos getAlbum y save album
5. en app.js se invocan las nuevas rutas de album
6. Crear metodo getSongs
6. Crear metodo deleteSongs
7. Crear metodo uploadSongFile
8. Crear metodo getSongFile

############################################################
#               CABECERAS CORS                             #
############################################################
1. Configurar cabeceras HTTP dentro de app.js


############################################################
#               INSTALAR EL ANGLUAR CLI                    #
############################################################

Instalar Angular CLI
https://angular.io/cli

npm install -g @angular/cli

2. Crear un folder de musify-frontend
3. Crear el proyecto de angular con: ng new musify
4. pararnos en la carpeta que creo angular musify y levantar la app con: ng serve
5. Instalamos boostrap: npm install bootstrap dentro de la carpeta assets/boostrap
https://getbootstrap.com/docs/4.3/getting-started/download/
6.Descargamos jquery en la carpeta asset/
curl https://code.jquery.com/jquery-1.12.4.min.js -o jquery.min.js

6. Realizar estos 3 import en el index.htlm
  <script type="text/javascript" src="assets/jquery.min.js"></script>
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
  <script type="text/javascript" src="assets/bootstrap/js/bootstrap.min.js"></script>


############################################################
#               CREAR MODELOS EN ANGULAR                   #
############################################################
1. Crear el folder src/app/models
2. Crear los ficheros user.ts, artist.ts, album.ts, song.ts en la ruta src/app/models 


############################################################
#               LOGIN Y REGISTRO                           #
############################################################
1. en app.component.html eliminar todo y hacer un <h1>{{title}}</h1>
2. en app.component.ts eliminar styleUrls: ['./app.component.css']
3. Dentro de app.component.ts creamos dentro de la clase app component las variables user, identity y token. La variable identity sera un boolean para saber si el user esta logueado o no, y el token sera el que se use en las interacciones con el back.
4. En app.module.ts se importa FormsModule y HttpClientModule. Tambien se agregan en la seccion imports.
5. Se crean los forms de login y register en app.component.html
6. Dentro de los campos se debe hacer el binding contra el modelo con ngModel
7. Se debe crear los metodos de signup, getToken, getIdentity

############################################################
#               USER SERVICE                              #
############################################################
1. Crear folder services dentro de /app
2. Crear fichero user.service.ts dentro de /app/services
3. Crear fichero global.ts dentro de /app/services Este archivo tendra las variables globales
4. en app.component.ts importe el user service y tambien incluirlo dentro de providers y dentro del constructor
5. Import de OnInit
6. en app.component.ts en la clase app component ponerla a que implemente la interfaz OnInit. Esto es por buena practica
7. Implementar el metodo OnInit invocando el metodo de prueba de user service imprimiendo un mensaje en consola

