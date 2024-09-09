import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    TabelaComponent,
    FiltrosComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
