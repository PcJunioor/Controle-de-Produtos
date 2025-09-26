import { ProdutoDetailsComponent } from "../produto-details/produto-details.component";
import { Observable, Subscription } from "rxjs";
import { ProdutoService } from "../produto.service";
import { Produto } from "../produto";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedDataService } from "../shared-data.service"; // Importe o serviço

@Component({
  selector: "app-produto-list",
  templateUrl: "./produto-list.component.html",
  styleUrls: ["./produto-list.component.css"],
})
export class ProdutoListComponent implements OnInit {
  produtos: Observable<Produto[]>;
  private updateSubscription: Subscription; // Para gerenciar a inscrição

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.reloadData();
    // Inscreva-se para receber notificações de atualização
    this.updateSubscription =
      this.sharedDataService.publicacoesUpdated$.subscribe((updated) => {
        if (updated) {
          this.reloadData();
        }
      });
  }

  reloadData() {
    this.produtos = this.produtoService.getProdutosList();
  }

  deleteProduto(id: number) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      this.produtoService.deleteProduto(id).subscribe(
        (data) => {
          console.log(data);
          this.reloadData();
          // Notifique outros componentes sobre a atualização
          this.sharedDataService.notifyUpdate();
        },
        (error) => console.log(error)
      );
    }
  }

  produtoDetails(id: number) {
    this.router.navigate(["details", id]);
  }

  updateProduto(id: number) {
    this.router.navigate(["update", id]);
  }

  ngOnDestroy() {
    // Cancela a inscrição ao destruir o componente
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
