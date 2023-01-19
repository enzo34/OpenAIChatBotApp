import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { BotService } from '../services/bot.service';
import { UtilsService } from '../services/utils.service';
import { ChatBot } from './model/ChatBot';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: true }) content!: IonContent;
  disabled: boolean = false;

  chatBot: ChatBot[] = [];

  question = '';
  listModels: any;
  selectedModel = "text-davinci-003";

  constructor(private botService: BotService, private utils: UtilsService) { }

  async ngOnInit() {
    await this.botService.getModels().subscribe(res => {
      this.listModels = res;
      console.log(this.listModels)
    });
  }

  async sendQuestion() {
    let q = this.question;
    if (this.question === '') {
      this.utils.presentToast("Le message ne peut être vide", 'danger')
    } else {
      this.disabled = true;

      await this.botService.getResponse(this.question, this.selectedModel).subscribe(res => {
        console.log(q)
        this.chatBot.push(new ChatBot(q, res.message.replace(/\n/g, "<br/>")));
        console.log(this.chatBot)
        this.content.scrollToBottom();
      }, err => {
        this.utils.presentToast("Une erreur c'est produite au niveau de l'API veuillez réessayez d'ici quelques minutes", "danger")
      });

      this.question = '';
      this.disabled = false
    }
  }

  async selectModel(model: any) {
    this.selectedModel = model.id;
    console.log(this.selectedModel)
    this.utils.presentToast("Le modèle a été sélectionné", 'success')
  }
}