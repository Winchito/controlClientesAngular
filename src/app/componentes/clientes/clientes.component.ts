import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  constructor(private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService){

  }

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm", {static: false}) clienteForm: NgForm;
  @ViewChild("botonCerrar", {static: false}) botonCerrar: ElementRef;
  
  ngOnInit(){
    this.clientesServicio.getClientes().subscribe(
      clientes =>{
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach(cliente =>{
        saldoTotal += Number(cliente.saldo);
      })
    }
    return saldoTotal;
  }


  agregar(clienteForm: NgForm){
    if(!clienteForm.valid){
      this.flashMessages.show("Por favor llena el formulario correctamente", {
        cssClass: 'alert-danger', timeout: 6000
      });
    }else{
      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(clienteForm.value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }


  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
