let fs = require('fs');// requiero los modulos de file sistem

let moduloProductos = {//objeto con metodos a modularizar
    archivo: './productos.json',//deposito de la ubicacion del archivo en una variable
    leerJSON: function() {//metodo que trae el archivo JSON y lo devuelve parceado
        let listaProductosJSON = fs.readFileSync(this.archivo, 'utf-8');//guardado en una variable el contenido del archivo JSON
        let listaProductos = JSON.parse(listaProductosJSON)//guardado en una variable el JSON parceado a un array con objetos literales

        return listaProductos;//retorno del JSON parceado
    },
    guardarJSON: function(info) {//metodo que sobre escribe el nuevo JSON sobre el anterior
        let productosActualizados = JSON.stringify(info);//metodo que convierte en string(formatoJSON) el array de objetos
        fs.writeFileSync(this.archivo, productosActualizados, 'utf-8');//metodo de fs para sobre escribir los datos en un archivo JSON(1-ubicacion del JSON, 2-datos que lo reemplazaran,3-codificacion )
    },
    cambiarPrecio: function(id, precio) {
        let listaProductos = this.leerJSON();

        listaProductos.forEach(producto => {
            if(producto.id == id) {
                producto.price = Number(precio)//use la funcion Number para que el precio cambiado no se guarde como string y que al usar la funcion filtrarPorPrecio no aparezca si no corresponde a pesar del filtro
            }
        })

        this.guardarJSON(listaProductos);
    },
    eliminar: function(id) {//devuelve una nueva lista de productos sin el especificado
        let listaProductos = this.leerJSON();

        let listaActualizada = listaProductos.filter(producto => {//mediamte el metodo .filter se busca que devuelva la lista de productos
            return producto.id != id;//usando como parametra esta desigualdad//retornar los productos que tengan id diferente a la que se paso por parametro
        })

        this.guardarJSON(listaActualizada);
    },
    filtrarPorPrecio : function(desde, hasta){
        let listaProductos = this.leerJSON();

        let listaFiltrada = listaProductos.filter(producto => {
            return producto.price >= desde && producto.price <= hasta
        })
        return listaFiltrada
    },
    buscarProducto : function(nombre){
        let listaProductos = this.leerJSON();
        let busquedaDeProducto = listaProductos.filter( producto => {
            return producto.name.toLowerCase().includes(nombre.toLowerCase())
        })
        return busquedaDeProducto
    },
    agregarProducto : function(id, nombre, precio){
        let listaProductos = this.leerJSON();

        let nuevoProducto = {
            id : Number(id),
            name : nombre,
            price : Number(precio)
        }
        listaProductos.push(nuevoProducto);

        this.guardarJSON(listaProductos)
    }

}

module.exports = moduloProductos;