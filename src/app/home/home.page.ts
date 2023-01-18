import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { BotService } from '../services/bot.service';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: true }) content!: IonContent;
  disabled: boolean = false;

  chatBot = [
    {
      question: 'Bonjour, je suis une IA de la société OpenAI. Comment puis-je vous aider?'
    },
    {
      response: 'Bonjour je suis un utilisateur de votre application'
    }
  ];

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
    if (this.question === '') {
      this.utils.presentToast("Le message ne peut être vide", 'danger')
    } else {
      this.chatBot.push({ question: this.question });
      this.botService.getResponse(this.question, this.selectedModel).subscribe(res => {
        this.chatBot.push({ response: res.message });
        this.content.scrollToBottom();
      });

      this.question = '';
    }
  }

  async selectModel(model: any) {
    this.selectedModel = model.id;
    console.log(this.selectedModel)
    this.utils.presentToast("Le modèle a été sélectionné", 'success')
  }
}