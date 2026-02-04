import { EventEmitter, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Models/producto';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private url: string = "http://localhost:5153/v1/api/Producto/";
  private productos$: Subject<Producto[]>;

  constructor(private http: HttpClient) {
    this.productos$ = new Subject();
  }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + 'getAll');
  }

  getById(idProducto: number): Observable<Producto> {
    return this.http.get<Producto>(this.url + `getById/${idProducto}`);
  }

  getBuscar(datoBuscar: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + `buscar/${datoBuscar.trim()}`);
  }

  delete(idProducto: number): Observable<number> {
    return this.http.delete<number>(this.url + `eliminar/${idProducto}`).
      pipe(tap(() => { this.refreshProductos() }));
  }

  update(idProducto: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url + `actualizar/${idProducto}`, producto).
      pipe(tap(() => { this.refreshProductos() }));
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url + 'crear', producto).
      pipe(tap(() => { this.refreshProductos() }));
  }
  private refreshProductos(): void {
    this.getAll().subscribe({
      next: (productos) => this.productos$.next(productos),
      error: (err) => console.error('Error al refrescar productos', err)
    });
  }
  // Método para suscribirse a los cambios de productos
  getProductosObservable(): Observable<Producto[]> {
    return this.productos$.asObservable();
  }

}
