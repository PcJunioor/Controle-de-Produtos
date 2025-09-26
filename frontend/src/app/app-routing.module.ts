import { ProdutoDetailsComponent } from "./produto-details/produto-details.component";
import { CreateProdutoComponent } from "./create-produto/create-produto.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProdutoListComponent } from "./produto-list/produto-list.component";
import { UpdateProdutoComponent } from "./update-produto/update-produto.component";

const routes: Routes = [
  { path: "", redirectTo: "produtos", pathMatch: "full" },
  { path: "produtos", component: ProdutoListComponent },
  { path: "add", component: CreateProdutoComponent },
  { path: "update/:id", component: UpdateProdutoComponent },
  { path: "details/:id", component: ProdutoDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
