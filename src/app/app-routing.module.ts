import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { PostsComponent } from './components/posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'postform', component: AddFormComponent },
  { path: 'edit/:id', component: AddFormComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
