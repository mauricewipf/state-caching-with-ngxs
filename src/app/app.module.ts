import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsState } from './products-state';
import { CountrycodeListComponent } from './countrycode-list/countrycode-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CountrycodeListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([ProductsState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
