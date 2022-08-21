//JavaScript Document

//Para que IndexedDB funcione en todos los navegadores
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;
//Definimos las variables generales del Programa
var bd;
var solicitud;
var Tabla;
var result;
var zonadatos;
var txtApellido;
var txtNombre;
var cursor;
var cuenta = 0;

function iniciar(){
	//alert("iniciar");

	//1. Identificar elementos página
	btnLogin = document.getElementById("BtnLogin");
	//Ponemos a la escucha los Botones:
	btnLogin.addEventListener("click", Login, false);
	
	//2. Crear Base de Datos
	var solicitud = indexedDB.open("basePB");
	//Verificamos la creación de la base de datos
	solicitud.onsuccess = function(e){
		//Guardamos la base de datos en una variable (bd)
		bd = e.target.result;
		//alert("La Base de Datos se creó con éxito");
	}
	//Creamos el almacén de objetos (Tabla) -> gente - usuarios - facturas
	solicitud.onupgradeneeded = function(e){
		//Si se requiere crear el almacén (Tabla) -> gente
		bd = e.target.result;
		//Si se requiere crear el almacén -> usuarios
		var tbUsuarios = bd.createObjectStore("usuarios", {keyPath: "apellido"});
		//Definimos uno o varios índices secundarios
		tbUsuarios.createIndex("nombre", "nombre", { unique: false});
		tbUsuarios.createIndex("usuario", "usuario", { unique: true});
	}
}

function Login(){
	//alert("Verificando Login");
	var bUsuario = document.getElementById("login").value;
	var bContra = document.getElementById("logContra").value;
	//Creamos la transacción
	var transaccion = bd.transaction(["usuarios"], "readwrite");
	var almacen = transaccion.objectStore("usuarios");
	var index = almacen.index("usuario");
	var request = index.openCursor(bUsuario);
	request.onsuccess = function(e){
		var cursor = e.target.result;
		if(cursor) {
			/*alert("Usuario: " + cursor.value.usuario + "\n\
	               Contraseña: " + cursor.value.clave);*/
			var SisUsuario = cursor.value.usuario;
			var SisContra = cursor.value.clave;
			//cursor.continue();
		}
		if (SisUsuario == bUsuario && bContra == SisContra){
			alert("Bienvenido a Naveguemos Seguros");
			window.open('index.html','_top');
			//window.open('index.html','_blank');
		}
		if (SisUsuario !== bUsuario || bContra !== SisContra){
			alert("Login INCORRECTO");
		}
	}
}

//Se ejecuta al cargar la página
window.addEventListener("load", iniciar, false);