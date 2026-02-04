import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../Servicios/producto.service';
import { Producto } from '../../../Models/producto';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {
  @Input() id: number = 0;
  isModalOpen = false;
  constructor(private productoService: ProductoService) {
  }

  public openModal(): void {
    this.isModalOpen = true;
    this.getProducto();
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }

  product: Producto = {
    id: 0,
    nombre: '',
    precio: 0.0,
    stock: 0,
    fecha: new Date('2023-10-25')
  };

  private getProducto(): void {
    this.productoService.getById(this.id).subscribe({
      next: (data) => this.product = data,
      error: (error) => console.log(error)
    });
  }
}
