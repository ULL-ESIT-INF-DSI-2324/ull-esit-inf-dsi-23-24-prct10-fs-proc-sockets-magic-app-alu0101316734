import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import { Client } from "./client.js";
import { Carta } from "./Cartas/Cartas.js";
import { Carta_Criatura } from "./Cartas/Cartas_Criatura.js";
import { Cartas_Planeswalker } from "./Cartas/Carta_Planeswalker.js";
import chalk from "chalk";
import { atributos_modificar } from "./gestorfichero/GestorFichero.js";
import { server } from "./server.js";

type Union = Carta | Carta_Criatura | Cartas_Planeswalker |undefined

let carta:Union;


const Server = new server(60300);
Server.conected();
yargs(hideBin(process.argv)).command('add','Añade una carta en la coleccion',{
    user:{
        description: 'nombre del usuario',
        type: 'string',
        demandOption: true
     },
     id: {
        description: 'ID de la carta',
        type: 'number',
        demandOption: true 
     },
     nombre: {
       description: 'nombre  de la carta',
       type: 'string',
       demandOption: true 
     },
     coste: {
        description: 'Coste de la carta',
        type: 'number',
        demandOption: true
     },
     color:{
        description: 'Color de la carta',
        type: 'string',
        demandOption: true
     },
     tipo:{
        description: 'Indica el tipo de carta',
        type: 'string',
        demandOption: true
     },
     rareza:{
        description: 'Indica la rareza de la carta',
        type: 'string',
        demandOption: true
     },
     texto:{
        description: 'Texto que indica el efecto de la carta',
        type: 'string',
        demandOption:true
     },
     valor:{
        description: 'El valor en el mercado de la carta',
        type: 'number',
        demandOption: true
     },
     estadistica:{
        description: 'Indica la fuerza y la vida de una criatura',
        type: 'array'
     },
     lealtad:{
        description: 'Marca de Lealtad para los planeswalker',
        type: 'number'
     }
    },(argv) =>{
         if (argv.estadistica !== undefined && argv.lealtad === undefined)
         {
            let estadistica = JSON.parse(String(argv.estadistica))
            carta = new Carta_Criatura(argv.id,argv.nombre,argv.coste,argv.color,argv.tipo,argv.rareza,argv.texto,argv.valor,[estadistica[0],estadistica[1]])
         }     
         else     
         if(argv.estadistica === undefined && argv.lealtad !== undefined)
           carta = new Cartas_Planeswalker(argv.id,argv.nombre,argv.coste,argv.color,argv.tipo,argv.rareza,argv.texto,argv.valor,argv.lealtad)
         else
         if(argv.estadistica === undefined && argv.lealtad === undefined)
           carta= new Carta(argv.id,argv.nombre,argv.coste,argv.color,argv.tipo,argv.rareza,argv.texto,argv.valor)
         else
         {
            console.error(chalk.red('Los parametros de la carta carta son incorrectos'))
         }
         const client = new Client(60300)
         client.conect_to_send(carta,argv.user,undefined,'add')
    })
.help().argv;


yargs(hideBin(process.argv)).command('list','Lista las cartas de la coleccion',{
   user:{
      description: 'nombre del usuario',
      type: 'string',
      demandOption: true
   }

},(argv)=>{
      const client = new Client(60300)
      client.conect_to_recive(argv.user,0,'list')  
   

})
.help().argv;

yargs(hideBin(process.argv)).command('search','buscar una carta de la coleccion',{
   user:{
      description: 'nombre del usuario',
      type: 'string',
      demandOption: true
   },
   id:{
      description: 'id de la carta a buscar',
      type: 'number',
      demandOption: true
   }
},(argv)=>{
      const client = new Client(60300)
      client.conect_to_recive(argv.user,argv.id,'search')
})
.help().argv;

yargs(hideBin(process.argv)).command('delete','eliminar una carta de la coleccion',{
   user:{
      description: 'nombre del usuario',
      type: 'string',
      demandOption: true
   },
   id:{
      description: 'id de la carta a buscar',
      type: 'number',
      demandOption: true
   }
},(argv)=>{
      const client = new Client(60300)
      client.conect_to_recive(argv.user,argv.id,'delete')
})
.help().argv;

yargs(hideBin(process.argv)).command('modify','Modifica una carta de la coleccion',{
   user:{
      description: 'nombre del usuario',
      type: 'string',
      demandOption: true
   },
   idbuscar:{
      description: 'id de la carta a buscar',
      type: 'number',
      demandOption: true
   },
   id: {
      description: 'ID de la carta a buscar',
      type: 'number'
   },
   nombre: {
     description: 'nombre  de la carta a buscar',
     type: 'string'
   },
   coste: {
      description: 'Coste de la carta a buscar',
      type: 'number'
   },
   color:{
      description: 'Color de la carta a buscar',
      type: 'string'
   },
   tipo:{
      description: 'Indica el tipo de carta a buscar',
      type: 'string'
   },
   rareza:{
      description: 'Indica la rareza de la carta a buscar',
      type: 'string'
   },
   texto:{
      description: 'Texto que indica el efecto de la carta a buscar',
      type: 'string'
   },
   valor:{
      description: 'El valor en el mercado de la carta a buscar',
      type: 'number'
   },
   estadistica:{
      description: 'Indica la fuerza y la vida de una criatura a buscar',
      type: 'array'
   },
   lealtad:{
      description: 'Marca de Lealtad para los planeswalker a buscar',
      type: 'number'
   }
},(argv)=>{
      const client = new Client(60300)
      let atributos:atributos_modificar={
         ID_buscar: argv.idbuscar,
         ID: argv.id,
         nombre: argv.nombre,
         tipo: argv.tipo,
         coste: argv.coste,
         color: argv.color,
         rareza: argv.rareza,
         texto: argv.texto,
         valor: argv.valor,

      }
      client.conect_to_send(undefined,argv.user,atributos,'modify')
})
.help().argv;





 





