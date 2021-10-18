import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { HomeUserComponent, QrcodeDialog } from './core/components/home-user/home-user.component';
import { HomeNoUserComponent } from './core/components/home-no-user/home-no-user.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { ButtonBackComponent } from './shared/components/button-back/button-back.component';
import { ListReposComponent } from './shared/components/list-repos/list-repos.component';
import { ContactsComponent } from './shared/components/contacts/contacts.component';
import { GithubCornerComponent } from './shared/components/github-corner/github-corner.component';
import { QrcodeComponent } from './shared/components/qrcode/qrcode.component';
import { ConfigsComponent } from './shared/components/configs/configs.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top.component';
import { ListFollowersComponent } from './shared/components/list-followers/list-followers.component';
import { ListFollowingComponent } from './shared/components/list-following/list-following.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ListStarredComponent} from "./shared/components/list-starred/list-starred.component";

export function HttpLoaderFactory(httpClient: HttpClient)
{
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeUserComponent,
    HomeNoUserComponent,
    ButtonComponent,
    ButtonBackComponent,
    ListReposComponent,
    ContactsComponent,
    GithubCornerComponent,
    QrcodeComponent,
    QrcodeDialog,
    ConfigsComponent,
    ScrollTopComponent,
    ListFollowersComponent,
    ListFollowingComponent,
    HomeComponent,
    ListStarredComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
    QRCodeModule,
    MatDialogModule,
    ClipboardModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    InfiniteScrollModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader,
        useFactory: HttpLoaderFactory, deps: [HttpClient]},
    }),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(private update: SwUpdate, private translate: TranslateService) {
    update.available.subscribe((update) => {
      this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    const message = `${this.translate.instant('worker.update')}`;
    const update = window.confirm(`${message}`);
    if(update)
    {
      this.doAppUpdate();
    }
  }

  doAppUpdate() {
    window.document.location.reload();
  }
}
