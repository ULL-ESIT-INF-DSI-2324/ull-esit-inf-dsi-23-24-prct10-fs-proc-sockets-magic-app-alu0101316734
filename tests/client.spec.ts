import "mocha"
import { expect } from "chai"
import  {Client} from "../src/client.js"
import { server } from "../src/server.js"
import { Carta } from "../src/Cartas/Cartas.js"
import { Cartas_Planeswalker } from "../src/Cartas/Carta_Planeswalker.js"
import { Carta_Criatura } from "../src/Cartas/Cartas_Criatura.js"
import fs from "fs"
import { atributos_modificar } from "../src/gestorfichero/GestorFichero.js"

describe('Pruebas del cliente',() =>{
    
    it('deberia funcionar add con Carta normal',() =>{
       const Server = new server(30600)
       Server.conected()
       const client = new Client(30600);
       const carta = new Carta(1,"prueba",5,"negro","Encantamiento","comun","texto",4)
       client.conect_to_send(carta,'test',undefined,'add');
       fs.access('./usuarios/test/prueba.json',(err) =>{
          expect(err).to.be.null
            
       })
    })
    it('deberia funcionar add con Carta Criaturar',() =>{
        const Server = new server(60300)
        Server.conected()
        const client = new Client(60300);
        const carta = new Carta_Criatura(2,"prueba_criatura",5,"negro","Criatura","comun","texto",4,[2,4])
        client.conect_to_send(carta,'test',undefined,'add');
        fs.access('./usuarios/test/prueba_criatura.json',(err) =>{
            expect(err).to.be.null
         })
     })
    it('deberia funcionar add con Carta Criaturar',() =>{
        const Server = new server(60300)
        Server.conected()
        const client = new Client(60300);
        const carta = new Cartas_Planeswalker(3,"prueba_planeswalker",5,"negro","Planeswalker","comun","texto",4,3)
        client.conect_to_send(carta,'test',undefined,'add');
        fs.access('./usuarios/test/prueba_planeswalker.json',(err) =>{
            expect(err).to.be.null
         })        
    })
    it('deberia listar las cartas',() =>{
        const Server = new server(60300)
        Server.conected()
        const client = new Client(60300);
        client.conect_to_recive('test',0,'list')        
    })
    it('deberia buscar una carta',() =>{
        const Server = new server(60300)
        Server.conected()
        const client = new Client(60300);
        client.conect_to_recive('test',2,'search')        
    })
    it('deberia modificar una carta',()=>{
        let atributos:atributos_modificar={
            ID_buscar: 7,
            ID:4,
            nombre: 'prueba2',
            texto: 'texto modifcado',
            color: 'azul',
            coste: 5,
            tipo: "Tierra",
            rareza: "rara",
            valor: 10
        }
        const Server = new server(60300)
        Server.conected()
        const client = new Client(60300);      
        client.conect_to_send(undefined,'test',atributos,'modify')  
        fs.readFile('./usuarios/test/prueba2.json',(_,data)=>{
            const dataJSON=JSON.parse(data.toString())
            expect(atributos.ID).equal(dataJSON.id)
            expect(atributos.texto).equal(dataJSON.texto)
            expect(atributos.nombre).equal(dataJSON.nombre)
            expect(atributos.color).equal(dataJSON.color)
            expect(atributos.coste).equal(dataJSON.coste)
            expect(atributos.tipo).equal(dataJSON.tipo)
            expect(atributos.rareza).equal(dataJSON.rareza)
            expect(atributos.valor).equal(dataJSON.valor)
        })
    })
    it('debería borrar el archivo',() =>{
        const carta = new Carta(10,"prueba",5,"negro","Encantamiento","comun","texto",4)  
        const dataJSON =JSON.stringify(carta)
        const Server = new server(60300)
        Server.conected()
        const client = new Client(60300);        
        fs.writeFile('./usuarios/test/borrar.json',dataJSON,(err)=>{
          if(err)
          {

          }else{
            client.conect_to_recive('test',10,'delete')
          }
        })     
    })
})