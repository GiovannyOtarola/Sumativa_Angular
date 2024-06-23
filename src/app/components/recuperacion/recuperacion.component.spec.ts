import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RecuperacionComponent } from './recuperacion.component';
import { RouterModule } from '@angular/router';

describe('RecuperacionComponent', () => {
  let component: RecuperacionComponent;
  let fixture: ComponentFixture<RecuperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperacionComponent,CommonModule,RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
