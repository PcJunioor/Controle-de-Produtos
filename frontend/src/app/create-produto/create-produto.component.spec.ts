import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateProdutoComponent } from "./create-produto.component";

describe("CreateProdutoComponent", () => {
  let component: CreateProdutoComponent;
  let fixture: ComponentFixture<CreateProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProdutoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
