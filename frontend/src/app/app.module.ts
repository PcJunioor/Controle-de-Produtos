import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateProdutoComponent } from "./create-produto/create-produto.component";
import { ProdutoDetailsComponent } from "./produto-details/produto-details.component";
import { ProdutoListComponent } from "./produto-list/produto-list.component";
import { HttpClientModule } from "@angular/common/http";
import { UpdateProdutoComponent } from "./update-produto/update-produto.component";
import { SharedDataService } from "./shared-data.service";
import { ProdutoService } from "./produto.service";
@NgModule({
  declarations: [
    AppComponent,
    CreateProdutoComponent,
    ProdutoDetailsComponent,
    ProdutoListComponent,
    UpdateProdutoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ProdutoService, SharedDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
