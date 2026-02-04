import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../Servicios/producto.service';
import { Producto } from '../../../Models/producto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {
  @Input() id: number = 0
  mensaje: string = '';
  constructor(private productoService: ProductoService) {
  }
  producto = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    precio: new FormControl(0, [Validators.required, Validators.min(1)]),
    stock: new FormControl(0, [Validators.required, Validators.min(1)]),
    fecha: new FormControl('', Validators.required)
  });

  isModalOpen = false;

  public openModal():void {
    this.isModalOpen = true;
  }

  public closeModal():void {
    this.isModalOpen = false;
    this.producto.reset();
    this.mensaje = '';
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
    this.crearProducto(product);
  }

  private crearProducto(producto: Producto): void {
    this.productoService.create(producto).subscribe({
      next: () => {
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.mensaje = error.error;
        console.log('Error al crear el producto :', error);
      }
    });
  }

  private getProducto(): void {
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
