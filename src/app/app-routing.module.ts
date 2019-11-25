import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { BodyComponent } from './components/body/body.component';


const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'favicon.ico', component: BodyComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
