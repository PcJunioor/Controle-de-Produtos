import { Component, OnInit } from "@angular/core";
import { Produto } from "../produto";
import { ActivatedRoute, Router } from "@angular/router";
import { ProdutoService } from "../produto.service";

// add isso aqui
import { SharedDataService } from "../shared-data.service";

@Component({
  selector: "app-update-produto",
  templateUrl: "./update-produto.component.html",
  styleUrls: ["./update-produto.component.css"],
})
export class UpdateProdutoComponent implements OnInit {
  id: number;
  produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private sharedDataService: SharedDataService // Injete o serviço **
  ) {}

  ngOnInit() {
    this.produto = new Produto();

    this.id = this.route.snapshot.params["id"];

    this.produtoService.getProduto(this.id).subscribe(
      (data) => {
        console.log(data);
        this.produto = data;
      },
      (error) => console.log(error)
    );
  }

  updateProduto() {
    this.produtoService.updateProduto(this.id, this.produto).subscribe({
      next: (data) => {
        console.log(data);
        this.sharedDataService.notifyUpdate(); // Notificar atualização
        this.gotoList();
      },
      error: (e) => console.log(e),
    });
  }

  onSubmit() {
    this.updateProduto();
  }

  gotoList() {
    this.router.navigate(["/produtos"]);
  }
}
