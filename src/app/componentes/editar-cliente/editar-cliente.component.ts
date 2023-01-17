import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit{
  id: string;

  constructor(private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router, private route: ActivatedRoute){

  }

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe(cliente =>
      {
        this.cliente = cliente;
      });
      
  }

  guardar(clienteForm: NgForm){
    if(!clienteForm.valid){
      this.flashMessages.show("Por favor llena el formulario correctamente", {
        cssClass: 'alert-danger', timeout: 6000
      });
    }else{
    clienteForm.value.id = this.id;
    this.clientesServicio.modificarCliente(clienteForm.value);
    this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('¿Está seguro que desea eliminar el cliente?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}