import { Produto } from "../produto";
import { Component, OnInit } from "@angular/core";
import { ProdutoService } from "../produto.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-produto-details",
  templateUrl: "./produto-details.component.html",
  styleUrls: ["./produto-details.component.css"],
})
export class ProdutoDetailsComponent implements OnInit {
  id: number;
  produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
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

  list() {
    this.router.navigate(["produtos"]);
  }

  edit() {
    this.router.navigate(["update", this.id]);
  }
}
