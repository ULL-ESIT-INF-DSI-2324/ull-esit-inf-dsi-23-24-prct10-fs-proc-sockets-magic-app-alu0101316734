# Practica 10 sockets para las cartas magic

## Funcionamiento

El funcionamiento es: `node dist/index.js [comando para ejecutar] --opciones y valores`

## Badge

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101316734/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101316734/actions/workflows/node.js.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101316734/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101316734?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101316734&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101316734)

## Introducción

En esta practica tendremos que hacer algo muy parecido a la práctica anterior.Sin embargo, la diferencia es que usaremos unos sockets.Estos sockets serán para comportarse como cliente y como servidor.También aprovechamos para usar el api de gestión de ficheros asincronos.En nuestro caso,usaremos la parte de callback para usar en nuestros ficheros

## Objetivos

En este caso aprenderemos a usar los siguientes temas:

* __Sockets__

* __Gestion de Ficheros asincronas__ 

* __Usar el patrón callback__

## Clases del codigo

El código de la clase es lo más fundamental del programa.Las clases funcionan de la siguientes forma

### Cliente

El cliente es una parte importante funciona de la siguente manera el constructor recive _number_ que sara el puerto de escucha para usar el socket.La clase tiene 2 métodos,1 con `conect_to_send` en el cual se envia los atributos a cambiar o añadir una carta nueva. La otra es `conect_to_recive` que busca una carta ya hecha y seleciona una de las cartas y gestiona la carta.

```ts
class Client
{
  constructor(private port:number)
  {}

  conect_to_send(Cartas:Union,user:string,objeto:atributos_modificar | undefined,comando:string ):void
  {
    /*Codigo */
  }
conect_to_recive(user:string,idbuscar:number,comando:string):void
  {
    /** Codigo */
  }
}
```

### Server

Esta clase es el servidor y también una parte importante del código.Como en la clase `Client` en la clase `server` el constructor recibe un _number_ que sera el puerto donde escucha al cliente.En este caso tenemos un método que es `connect`.Para recibir lo que nos envia el cliente usaremos lo siguiente.

```ts
        conection.on('data',(data) =>{
           let carta:Union;
           const datos = JSON.parse(data.toString()) 
           const [dataclass,dataobject,user,comando ]= datos
           //Codigo
        })
```

usamos el evento __data__ para ejecutar el código.Cuando llega lo parseamos a JSON y como los llega es un vector lo dividimos segun los datos de la clase,los datos del objeto a modificar,usuario y el comando, el comando nos dejara ejecutar la acción correspondiente.Los datos de la clase  y del objeto pueden ser _undefined_

### Gestionar Fichero

Esta clase es la que gestiona todos los ficheros con cada metodo.Usando el patrón callback para gestionarlo de manera asincrona.En cuanto al codigo algo sería parecido a esto

```ts
class GestorFichero
{
    constructor(private nombre_usuario:string)
    {}
    public escribir_archivo(Carta:Carta,callback:(err:Error | undefined) => void) {
        //Codigo
    }
}
```

Así gestionamos de manera asincrona devolviendo el __callback__  _Error_ en el caso de que se produzca un error y _undefined_ en el caso contrario de que vaya todo correctamente.Tambien esta el constructor del que recibe el nombre del parámentro adecuado. El __callback__ se gestiona en el servidor dependiendo y hahabido un error  o en caso contrario enviar lo que sea correspondiente

### Carta

hablaremos de la clase principal que es `Carta`

```ts
class Carta implements Carta_interface
{
  constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number)
  {
    //Construye la carta con los atributos correspondientes
  }
  toJSON()
  {
    //Pasa la clase a formato JSON 
  }
}
```

La clase su principalfuncion es almacenar los atributos pasados por constructor y una vez hecho esto definir un `toJSON` para pasar el formato _JSON_.

### Criatura

En cuanto a otras clases tenesos esta:

```ts
class Carta_Criatura extends Carta
{
    constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number,public estadistica:stats)
    {
       // construimos a base de la clase heredada
    }    
    toJSON()
    {
      // añadimos los atributos extras
    }
}
```

Esta clase es una clase particular del tipo de carta porque necesita un atributo necesario como es estadistica.Luego el nuevo atributo lo añadimos en el toJSON para poder pasarlo a _JSON_ también.

### Planeswalker

La otra clase es muy parecida a la anterior dado que el tipo de carta tiene un atributo el cual no tiene el tipo de carta genérico.

```ts
class Cartas_Planeswalker extends Carta
{
    constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number,public lealtad:number)
    {
        // construimos a base de la clase heredada
    }       
    toJSON() {
         // añadimos los atributos extras
    }
}
```

## Opciones

## Opciones del programa

### Add

Empezamos pidiendo los argumentos que necesitan para crear un archivo y son

* __user__ El usuario  que quiere añadir

* __id__ El identificador de la carta

* __nombre__ el nombre dicha carta

* __coste__ el numero de mana que cuesta jugar la carta

* __color__ el color de la carta

* __tipo__  el tipo especifico de la carta

* __rareza__ la dificultad de conseguir esta carta

* __texto__ indica el efecto de la carta

* __valor__ este es su valor en el mercado de compra/venta

* __estadistica__ es una dupla de la fuerza y vida de las cartas criaturas

* __lealtad__ es un nivel de lealtad que poseen las cartas planeswalker

Una vez procesados mediante _yargs_ empezamos comprobando si la informacion es correcta en cada uno.

### List

Para ejecutarlo solo necesitamaos el __user__

### Search

Para ejecutarlo solo necesitamaos el __user__ y el __id__ de la carta que queremos buscar

### Delete

Para ejecutar este comando necsitamos el __user__ y el __id__ de eliminar

### Modify

Para ejecutar este comando necsitamos el __user__ y el __id__ a modificar.Y el resto son argumentos opcionales para su modifcación.

Como podemos estos comandos se ejecuta muy parecido a la practica anterior dado que usamos la misma herrramienta __yargs__

## Conclusiones

En esta práctica hemos hecho una práctica parecida a la anterior.Con lo cual pude reciclar algo de código. Sin embargo tuve que crear 2 clases diferentes que son `Client` y `server`. También tuve que modificar la gestión de fichero para que fuera asincrona y implementar el patrón callback.Después de realizar esta practica entiendo mucho mejor como fucnioan el código asincrono porque tuve bastante promeas como por ejemplo en el `foreach` que muchas veces  no habia termando el bucle con lo cual,por ejemplo en el __List__ no listaba toda la colección entera.El patrón callback es muy util pero me parecio engorroso.

## Bibliografia

[typedoc] (https://typedoc.org)

[typescript] (https://www.typescriptlang.org/docs/)

[nodejs] (https://nodejs.org/en)

[javascript] (https://developer.mozilla.org/es/docs/Web/JavaScript)
