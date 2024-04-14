import socket from 'net'

import { GestorFichero } from './gestorfichero/GestorFichero.js'
import { Carta } from './Cartas/Cartas.js'
import chalk from 'chalk'
import { atributos_modificar } from './gestorfichero/GestorFichero.js'
import { Union } from './client.js'
import { Carta_Criatura } from './Cartas/Cartas_Criatura.js'
import { Cartas_Planeswalker } from './Cartas/Carta_Planeswalker.js'


/**@class clase servidor  para gestionar las cartas*/
export class server
{
   /**
    * @constructor 
    * @param port el puerto por el que escucha el servidor
    */
  constructor(private port:number)
  {}
  /**@public sirve unicamente  para conectarse*/
  conected()
  {
    const server = socket.createServer((conection)=>{
        conection.on('data',(data) =>{
           let carta:Union;
           const datos = JSON.parse(data.toString()) 
           const [dataclass,dataobject,user,comando ]= datos
           const fichero = new GestorFichero(user)
           if(dataclass !== null)
           {
            const dataJSON=dataclass
            if(dataJSON.estadistica === undefined && dataJSON.lealtad === undefined)
             carta = new Carta(dataJSON.id,dataJSON.nombre,dataJSON.coste,dataJSON.color,dataJSON.tipo,dataJSON.rareza,dataJSON.texto,dataJSON.valor) 
            if(dataJSON.estadistica !== undefined)
             carta = new Carta_Criatura(dataJSON.id,dataJSON.nombre,dataJSON.coste,dataJSON.color,dataJSON.tipo,dataJSON.rareza,dataJSON.texto,dataJSON.valor,dataJSON.estadistica)
            if(dataJSON.lealtad !== undefined)
              carta= new Cartas_Planeswalker(dataJSON.id,dataJSON.nombre,dataJSON.coste,dataJSON.color,dataJSON.tipo,dataJSON.rareza,dataJSON.texto,dataJSON.valor,dataJSON.lealtad)
           }
           let interfaz: atributos_modificar = {};
           if (dataobject !== null) {
             const dataobjectJSON = dataobject;
             interfaz = dataobjectJSON;
           }
           console.log(comando);
           switch(comando) {
            case 'add':
                if (undefined !== carta) {
                    fichero.escribir_archivo(carta, (err) => {
                        if (err) {
                            conection.write(chalk.red('Error al escribir un archivo', err.message))
                        } else {
                            conection.write(chalk.green('Archivo añadido exitosamente'))
                        }
                    });
                }
                break;
            case 'modify':
                if (interfaz.ID_buscar) {
                    fichero.modificar_archivo('./usuarios/' + user, interfaz.ID_buscar, interfaz, (err) => {
                        if (err) {
                            conection.write(chalk.red('Error al escribir un archivo'))
                        } else {
                            conection.write(chalk.green('Archivo modificado exitosamente'))
                        }
                    });
                }
                break;
            case 'delete':
                if (interfaz.ID_buscar) {
                    fichero.borrar_archivo('./usuarios/' + user, interfaz.ID_buscar, (err) => {
                        if (err) {
                            conection.write(chalk.red('Error del archivo a la hora de borrar un archivo'))
                        } else {
                            conection.write(chalk.green('Archivo borrado exitosamente'))
                        }
                    });
                }
                break;
            case 'list':
                fichero.mostrar_archivo('./usuarios/' + user, (err, dato) => {
                    if (!err) {
                        conection.write(JSON.stringify(dato))
                    } else {
                        conection.write(chalk.red('Error al mostrar los archivos'))
                    }
                });
                break;
            case 'search':
                  if (interfaz.ID_buscar) {
                     fichero.search_archivo('./usuarios/' + user, interfaz.ID_buscar, (err, dato) => {
                           if (!err) {
                              conection.write(JSON.stringify([dato]))
                           } else {
                              conection.write(chalk.red('error a la hora de buscar un archivo'))
                            }
                        });
                    }
               break;
               default:
                  conection.write(chalk.red('Comando no reconocido'));        
           
               }
               server.close();
            })
    }).listen(this.port,()=>{
        console.log('Esperando clientes')
    })
  }

}