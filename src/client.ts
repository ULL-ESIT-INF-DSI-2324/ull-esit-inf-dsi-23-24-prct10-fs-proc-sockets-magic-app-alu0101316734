import net from 'net'
import { Carta_Criatura } from './Cartas/Cartas_Criatura.js'
import { Cartas_Planeswalker } from './Cartas/Carta_Planeswalker.js'
import { Carta } from './Cartas/Cartas.js'
import { atributos_modificar } from './gestorfichero/GestorFichero.js'
import chalk from 'chalk'

export type Union = Carta | Carta_Criatura | Cartas_Planeswalker |undefined


 

/**@class Clase cliente */
class Client
{
  constructor(private port:number)
  {}
  /**
   * @public metodo para enviar
   * @param Cartas carta para enviar al servidor
   * @param user usuario
   * @param objeto objecto para ayudar a modifcar,buscar y borrar
  */
  conect_to_send(Cartas:Union,user:string,objeto:atributos_modificar | undefined,comando:string ):void
  {
    /**@const client El socket que ultliza el cliente */
    const client= net.connect(this.port);
    let dataJSON: [Union, atributos_modificar | null, string, string]; // Definimos dataJSON como un arreglo

    if (objeto === undefined) {
      dataJSON = [Cartas, null, user, comando]; // Enviar null en lugar de undefined
    } else {
      dataJSON = [Cartas, objeto, user, comando];
    }
    client.write(JSON.stringify(dataJSON)); // Ahora podemos serializar dataJSON correctamente
    client.end();
  }
  /**
   * @public metodo para enviar
   * @param user usuario
   * @param comando comando para saber lo que se hace en el servidor
   *  @param idbuscar id para buscar un archivo de la carta
   */
  conect_to_recive(user:string,idbuscar:number,comando:string):void
  {
    const client= net.connect(this.port)
    let carta:Union = undefined;
    const atributos={
      ID_buscar: idbuscar
    }
    client.write(JSON.stringify([carta,atributos,user,comando]))
    client.on('data', (data)=>{ 
      try{
        const dataJSON=JSON.parse(data.toString())
        const arrayJSON=[...dataJSON]
        arrayJSON.forEach(element => {
          if(element.lealtad !== undefined)
          carta=new Cartas_Planeswalker(element.id,element.nombre,element.coste,element.color,element.tipo,element.rareza,element.texto,element.valor,element.lealtad)
        if(element.estadistica !== undefined)
          carta=new Carta_Criatura(element.id,element.nombre,element.coste,element.color,element.tipo,element.rareza,element.texto,element.valor,element.lealtad)
        if(element.lealtad === undefined && element.estadistica === undefined)
          carta=new Carta(element.id,element.nombre,element.coste,element.color,element.tipo,element.rareza,element.texto,element.valor)
          if(carta)
          {
          console.log(chalk.yellow("---------------------------------"))
          console.log(chalk.yellow("ID: ", carta.ID))
          console.log(chalk.yellow("Nombre: ", carta.nombre))
          console.log(chalk.yellow("Coste: ", carta.coste))
          console.log(chalk.yellow("Color: ", carta.color))
          console.log(chalk.yellow("Tipo: ", carta.tipo))
          console.log(chalk.yellow("Rareza: ", carta.rareza))
          console.log(chalk.yellow("Texto: ", carta.texto))
          console.log(chalk.yellow("Valor: ", carta.valor))
          if(carta instanceof Carta_Criatura)
          {
              console.log(chalk.yellow("Fuerza ", carta.estadistica[0]))
              console.log(chalk.yellow("Vida: ", carta.estadistica[1]))
           }
           if(carta instanceof Cartas_Planeswalker)
              console.log(chalk.yellow("Lealtad: ", carta.lealtad))  
          }
        })
      }catch(err)
      {
        console.log(data.toString())
      }
         
        client.end();
      });



  }
}

export {Client}