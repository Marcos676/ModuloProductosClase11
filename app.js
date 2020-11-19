let moduloProductos = require('./productos');

let process = require('process');
let comando = process.argv[2];

switch (comando) {
    case 'listar':
        let productos = moduloProductos.leerJSON();

        console.log('------------------');
        console.log("Lista de productos");
        console.log('------------------');

        productos.forEach(producto=>{
            return console.log('id: ' + producto.id + ' Producto: ' + producto.name + ' Precio: ' + producto.price)
        })
        break;

    case 'cambiarPrecio':
        let id = process.argv[3];
        let precio = process.argv[4];

        moduloProductos.cambiarPrecio(id, precio);//(process.argv[3], process.argv[4]) para evitar crear las 2 variables
        if( process.argv[3] === undefined || process.argv[4] === undefined){
            console.log('---------------------------------------------')
            console.log('          COMPLETE TODOS LOS DATOS           ')
            console.log('---------------------------------------------')
            break;
        }
        console.log('--------------------------------');
        console.log('Producto modificado correctamente');
        console.log('--------------------------------');
        break;

    case 'eliminar':
        let idEliminar = process.argv[3];

        moduloProductos.eliminar(idEliminar);// es igual que (process.argv[3]) sin la variable

        console.log('--------------------------------');
        console.log('Producto eliminado correctamente');
        console.log('--------------------------------');
    break;

    case 'filtrar':
        
        let preciosFiltrados = moduloProductos.filtrarPorPrecio(process.argv[3], process.argv[4])

        console.log('--------------------------------');
        console.log('    Productos de '+process.argv[3]+' hasta '+process.argv[4]);
        console.log('--------------------------------');
        preciosFiltrados.forEach(producto=>{
            return console.log('id: ' + producto.id + ' Producto: ' + producto.name + ' Precio: ' + producto.price);
        })

    break;
    case 'buscar':
        let productoBuscado = moduloProductos.buscarProducto(process.argv[3]);

        if (process.argv[3] === undefined){
            console.log('-------------------------------------------');
            console.log('     DEBE ESCRIBIR LO QUE DESEA BUSCAR     ');
            console.log('-------------------------------------------');
            break;
        }if(productoBuscado.length == 0){
            console.log('---------------------------------------------')
            console.log('EL PRODUCTO '+ process.argv[3].toUpperCase()+' NO ESTA DISPONIBLE')
            console.log('---------------------------------------------')
            break;

        }

        console.log('--------------------------------');
        console.log('Busqueda de '+process.argv[3]);
        console.log('--------------------------------');

        productoBuscado.forEach(producto=>{
                return console.log('id: ' + producto.id + ' Producto: ' + producto.name + ' Precio: ' + producto.price);
        })
    break;
    case 'agregar':
        if (process.argv[3] === undefined  || process.argv[4] === undefined || process.argv[5] === undefined ){
            console.log('-------------------------------------------');
            console.log('DEBE COMPLETAR TODOS LOS DATOS DEL PRODUCTO');
            console.log('-------------------------------------------');
            break;
        }
        
        moduloProductos.agregarProducto(process.argv[3], process.argv[4], process.argv[5])

        console.log('--------------------------------');
        console.log('Producto agregado correctamente');
        console.log('--------------------------------');
    break;

    case undefined:
        console.log(`DEBE UTILIZAR ALGUNO DE LOS SIGUIENTES COMANDOS:
        -listar
        -buscar
        .agregar
        -filtrar
        -eliminar
        -cambiarPrecio`);
        break;
    default:
        console.log('---------------------------------------------')
        console.log('-----ESTE COMANDO NO ESTÁ DISPONIBLE---------')
        console.log('---------------------------------------------')
        break;


}