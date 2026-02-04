import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../Servicios/producto.service';
import { Producto } from '../../Models/producto';
import { CommonModule } from '@angular/common';
import { NuevoComponent } from "./nuevo/nuevo.component";
import { DetallesComponent } from "./detalles/detalles.component";
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateComponent } from "./update/update.component";

@Component({
  selector: 'app-consumo-apinet-core',
  standalone: true,
  imports: [CommonModule, NuevoComponent, DetallesComponent, UpdateComponent],
  templateUrl: './consumo-apinet-core.component.html',
  styleUrl: './consumo-apinet-core.component.css'
})
export class ConsumoAPINetCoreComponent implements OnInit {
  productos: Producto[] = [];
  isModalOpen = false;
  totalProductos: number = 0;
  fecha: Date = new Date();
  fechaActual: number = this.fecha.setDate(this.fecha.getDate() - 6);
  isClicked = false;

  constructor(private productoService: ProductoService) { }

  public ngOnInit(): void {
    this.getProductos();
    this.productoService.getProductosObservable().subscribe(productos => {
      this.productos = productos;
      this.totalProductos = productos.length;
    });
  }  

  public openModal():void {
    this.isModalOpen = true;
  }

  public closeModal():void {
    this.isModalOpen = false;
  }

  public animateButton():void {
    this.isClicked = true;
    setTimeout(() => this.isClicked = false, 300);
  }

  public getProductos(): void {
    this.productoService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
        this.totalProductos = data.length;
      },
      error: (error) => console.error(error)
    });
  }

  public eliminarProducto(idProducto: number): void {
    const confirme = window.confirm("¿Está seguro que desea eliminar este producto ?");
    if (confirme) {
      this.productoService.delete(idProducto).subscribe(
        {
          error: (error) => console.error(error)
        }
      )
    }
  }

  public buscarProducto(datoBuscar: string): void {
    if (!datoBuscar?.trim()) {
      this.getProductos();
      return;
    }
    this.productoService.getBuscar(datoBuscar).subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.productos = [];
          alert(`No se encontraron productos con este criterio = ${datoBuscar}`);
          console.error(error?.error?.error || 'Error al buscar productos');
        } else {
          console.error('Error en la búsqueda:', error);
          alert('Ocurrió un error al realizar la búsqueda');
        }
      }
    });
  }
}
