import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreencastComponent } from './screencast/screencast.component';
import { ChatboxComponent } from './chatbox/chatbox.component';


const routes: Routes = [
  { path: 'scast', component: ScreencastComponent },
  { path: 'chatbox', component: ChatboxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
