import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../../Servicios/producto.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../Models/producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})

export class UpdateComponent implements OnInit {
  @Input() id: number = 0
  isModalOpen = false;

  constructor(private productoService: ProductoService) {    
  }

  public ngOnInit(): void {
    this.getProducto();
  }

  producto = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    precio: new FormControl(0, [Validators.required, Validators.min(1)]),
    stock: new FormControl(0, [Validators.required, Validators.min(1)]),
    fecha: new FormControl('', Validators.required)
  });

  public openModal():void {
    this.isModalOpen = true;
  }

 public closeModal():void {
    this.isModalOpen = false;
  }

 public submitProducto():void {
    if (this.producto.invalid) {
      this.producto.markAllAsTouched();
      return;
    }
    const product: Producto = {
      id: this.producto.value.id || 0,
      nombre: this.producto.value.nombre || '',
      precio: Number(this.producto.value.precio || 0),
      stock: Number(this.producto.value.stock || 0),
      fecha: new Date(this.producto.value.fecha || '')
    };
    this.actualizarProducto(product);
  }
  
 public actualizarProducto(producto: Producto):void {
    this.productoService.update(producto.id, producto).subscribe({
      next: () => {
        this.producto.reset();
        this.closeModal();
      },
      error: (error) => {
        console.log('Error al actualizar el producto :', error);
      }
    });
  }

 public getProducto():void {
    this.productoService.getById(this.id).subscribe({
      next: (data) => {
        this.producto.patchValue({
          id: data.id,
          nombre: data.nombre,
          precio: data.precio,
          stock: data.stock,
          fecha: new Date(data.fecha).toISOString().substring(0, 10)
        });
      },
      error: (error) => console.log(error)
    });
  }

}
