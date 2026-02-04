import { Component ,AfterViewInit} from '@angular/core';
import { initModals } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { ConsumoAPINetCoreComponent } from './componentes/consumo-apinet-core/consumo-apinet-core.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ConsumoAPINetCoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    initModals(); // Inicializa los modales de Flowbite    
  }
  title = 'Consumo API Net Core8';
}
