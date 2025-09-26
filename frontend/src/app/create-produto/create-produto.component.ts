import { ProdutoService } from "../produto.service";
import { Produto } from "../produto";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SharedDataService } from "../shared-data.service";
import { NgForm, NgModel } from "@angular/forms";

@Component({
  selector: "app-create-produto",
  templateUrl: "./create-produto.component.html",
  styleUrls: ["./create-produto.component.css"],
})
export class CreateProdutoComponent implements OnInit {
  produto: Produto = new Produto();
  isLoading: boolean = false;
  successMessage: string = "";
  errorMessage: string = "";
  ultimoProduto: Produto | null = null;
  formSubmitted = false;

  @ViewChild("produtoForm", { static: false }) produtoForm!: NgForm;
  @ViewChild("preco", { static: false }) precoField!: NgModel;
  @ViewChild("nomeProduto", { static: false }) nomeProdutoField!: NgModel;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {}

  resetForm(form?: NgForm): void {
    if (form) {
      form.resetForm();
    }
    this.produto = new Produto();
    this.isLoading = false;
    this.errorMessage = "";
    this.formSubmitted = false;

    // Resetar manualmente o estado dos campos
    if (this.nomeProdutoField) {
      this.nomeProdutoField.control.markAsUntouched();
      this.nomeProdutoField.control.markAsPristine();
    }
    if (this.precoField) {
      this.precoField.control.markAsUntouched();
      this.precoField.control.markAsPristine();
    }
  }

  // Método para forçar a validação
  forceValidation() {
    this.formSubmitted = true;

    // Forçar validação de todos os campos manualmente
    if (this.nomeProdutoField) {
      this.nomeProdutoField.control.markAsTouched();
      this.nomeProdutoField.control.markAsDirty();
    }
    if (this.precoField) {
      this.precoField.control.markAsTouched();
      this.precoField.control.markAsDirty();
    }
  }

  save() {
    if (this.produtoForm.invalid) {
      return;
    }

    this.errorMessage = "";
    this.successMessage = "";
    this.isLoading = true;

    this.produtoService.createProduto(this.produto).subscribe({
      next: (data) => {
        this.sharedDataService.notifyUpdate();
        this.successMessage = "Produto cadastrado com sucesso!";
        this.ultimoProduto = data;
        this.resetForm(this.produtoForm);
        this.isLoading = false;
        setTimeout(() => (this.successMessage = ""), 3000);
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage =
          e.status === 400
            ? "Erro de validação: Verifique os dados informados"
            : "Ocorreu um erro ao cadastrar o produto";
      },
    });
  }

  onSubmit() {
    this.forceValidation();

    if (this.produtoForm.valid) {
      this.save();
    }
  }
}
