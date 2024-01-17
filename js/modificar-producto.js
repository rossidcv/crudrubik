console.log(location.search)     // lee los argumentos pasados a este formulario
var args = location.search.substr(1).split('&');  
//separa el string por los “&” creando una lista [“id=3” , “nombre=’tv50’” , ”descripcion=1200”,”stock=20”]
console.log(args)
var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
//decodeUriComponent elimina los caracteres especiales que recibe en la URL 
document.getElementById("id").value = decodeURIComponent(parts[0][1])
document.getElementById("nombre").value = decodeURIComponent(parts[1][1])
document.getElementById("detalle").value = decodeURIComponent(parts[2][1])
document.getElementById("categoria").value = decodeURIComponent(parts[3][1])
document.getElementById("precio").value =decodeURIComponent( parts[4][1])
document.getElementById("foto").value =decodeURIComponent( parts[5][1])

function modificar() {
    let id = document.getElementById("id").value
    let n = document.getElementById("nombre").value
    let d = document.getElementById("detalle").value
    let ca = document.getElementById("categoria").value
    let p = parseInt(document.getElementById("precio").value)
    let f = document.getElementById("foto").value
    let producto = {
        nombre: n,
        detalle: d,
        categoria: ca,
        precio: p,
        foto: f,
    }
    let url = "https://monicadcv.mysql.pythonanywhere-services.com/productos/"+id
    var options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")
            window.location.href = "./productos.html";  //NUEVO 
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al Modificar")
        })      
}
