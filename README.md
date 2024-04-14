# Practica 10 sockets para las cartas magic

## Funcionamiento

El funcionamiento es: `node dist/index.js [comando para ejecutar] --opciones y valores`

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

usamos el evento __data__ para ejecutar el código.Cuando llega lo parseamos a JSON y como los llega es un vector lo dividimos segun los datos de la clase,los datos del objeto a modificar,usuario y el comando, el comando nos dejara ejecutar la acción correspondiente.

