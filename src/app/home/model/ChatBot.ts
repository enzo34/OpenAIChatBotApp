import { SafeHtml } from "@angular/platform-browser";

export class ChatBot {
    question: string;
    response: SafeHtml;
    
    constructor(question: string, response: SafeHtml) {
      this.question = question;
      this.response = response;
    }
  }
  