import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChatPage} from './chat';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    ChatPage
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
    TranslateModule
  ],
  providers: [
    
  ]
})
export class ChatPageModule {}