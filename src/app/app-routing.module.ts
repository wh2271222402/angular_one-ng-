import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DengluComponent } from './components/denglu/denglu.component';
import { HtComponent } from './components/ht/ht.component';
import { ArticleLbComponent } from './components/ht/article-lb/article-lb.component';
import { ArticleXqComponent } from './components/ht/article-xq/article-xq.component';
import { WelcomeComponent } from './components/ht/welcome/welcome.component'


const routes: Routes = [
  {path:'denglu', component:DengluComponent},
  {
    path:'ht', component:HtComponent,
    children:[
      {path:'welcome', component:WelcomeComponent},
      {path:'article-lb', component:ArticleLbComponent},
      {path:'article-xq', component:ArticleXqComponent},

      {path:'**', redirectTo:'welcome'}
    ]
  },

  {path:'**', redirectTo:'denglu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
