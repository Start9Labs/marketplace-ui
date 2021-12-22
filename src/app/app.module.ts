import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { ApiServiceFactory } from './services/api/api.factory'
import { ApiService } from './services/api/api.service'
import { HttpService } from './services/http.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md',
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ApiService, useFactory: ApiServiceFactory, deps: [HttpService] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
