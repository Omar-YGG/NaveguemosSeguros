//JavaScript Document

//Para que IndexedDB funcione en todos los navegadores
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;
//Definimos las variables generales del Programa
var bd;
var solicitud;
var agregar;
var Tabla;
var result;
var zonadatos;
var txtNombre;
var cursor;
var cuenta = 0;

function iniciar(){
	//alert("iniciar");

	//1. Identificar los elementos de la página
	txtNombre = document.getElementById("nombre");
	txtEdad = document.getElementById("edad");
	txtUsuario = document.getElementById("usuario");
	btnRegistrar = document.getElementById("Registrar");

	//Ponemos a la escucha los Botones:
	btnRegistrar.addEventListener("click", Registrar, true);

	//2. Crear Base de Datos
	var solicitud = indexedDB.open("basePB2");
	//Verificamos la creación de la base de datos con los eventos:
	//onsuccess: Evento de crear la base de datos
	//onupgradeneeded: Evento de actualizar la base de datos
	solicitud.onsuccess = function(e){
		//Guardamos la base de datos en una variable (bd)
		bd = e.target.result;
		//alert("La Base de Datos se creó con éxito");
	}
	//Creamos el almacén de objetos (Tabla) -> gente - usuarios - facturas
	solicitud.onupgradeneeded = function(e){
		//Este evento sólo se ejecuta la primera vez que se crea la BD
		//Si se requiere crear el almacén (Tabla) -> gente
		bd = e.target.result;
		bd.createObjectStore("gente", {keyPath: "clave"});
		//Si se requiere crear el almacén -> usuarios - facturas
		var tbUsuarios = bd.createObjectStore("u
		tbUsuarios.createIndex("nombre", "nombsuarios", {keyPath: "nombre"});
		//Definimos uno o varios índices secundariosre", { unique: false});
		tbUsuarios.createIndex("usuario", "usuario", { unique: true});
		var tbFacturas = bd.createObjectStore("facturas", {keyPath: "NumFac"});
		//Definimos los índices para el almacen Facturas
		tbFacturas.createIndex("id", "id", { unique: true});
		tbFacturas.createIndex("nombre", "nombre", { unique: false});
	}
}

function Registrar(){
	//Función para agregar objetos (Registros) a la BD
	//Recuperamos y Guardamos en variable los campos del formulario
	var nombre = document.getElementById("nombre").value;
	if(nombre==""){
	alert("El nombre no puede estar vacio")
	return
	}
	var edad = document.getElementById("edad").value;
	var usuario = document.getElementById(").value;
	var clave = document.getElementById("contrasena")"usuario.value;
	//Agregamos al almacén de datos los objetos (registros)
	//Creamos la Transacción al almacén "usuarios" para lecto-escritura
	var transaccion = bd.transaction(["usuarios"], "readwrite");
	//Almacenamos en la variable almacen la transacción
	var almacen = transaccion.objectStore("usuarios");
	//Agregamos los datos del registro a los "campos"
	//utilizando el Método add de la API IndexedDB
	var agregar = almacen.add({nombre: nombre, edad: edad,  usuario: usuario, clave: clave});
	//Si agregar el objeto (registro) es exitoso, se ejecuta --> mostrar
	//agregar.addEventListener("success", VerUsuarios, true);
	agregar.addEventListener("success", VerUsuarios, false);
	Limpiar();
	window.open('Login.html','_top');
	alert("El Registro se realizó con éxito");
	
	//Limpiamos los campos del formulario
}


function Limpiar(){
	 document.getElementById("nombre").value ="";
	 document.getElementById("edad").value ="";
	 document.getElementById("usuario").value ="";
	 document.getElementById("contrasena").value ="";
}

//Se ejecuta al cargar la página
//Se coloca el navegador "a la escucha"
window.addEventListener("load", iniciar, false);