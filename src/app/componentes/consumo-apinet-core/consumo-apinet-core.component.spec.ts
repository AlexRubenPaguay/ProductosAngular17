import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoAPINetCoreComponent } from './consumo-apinet-core.component';

describe('ConsumoAPINetCoreComponent', () => {
  let component: ConsumoAPINetCoreComponent;
  let fixture: ComponentFixture<ConsumoAPINetCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumoAPINetCoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumoAPINetCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
