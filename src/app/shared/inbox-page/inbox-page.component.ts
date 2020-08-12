import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Message } from '../../core/models/chat';
import { SocketService } from '../../core/services/socket.service';
import { IsMinePipe } from '../../ui-kit/pipes/is-mine.pipe';
import { ChatService } from '../../core/services/chat.service';

@Component({
  selector: 'job-hub-inbox-page',
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.scss']
})
export class InboxPageComponent implements OnInit, OnDestroy {

  chats$ = this.chatService.chats$.asObservable();
  keyword = '';

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private chatService: ChatService,
    private isMinePipe: IsMinePipe
  ) {
    this.chatService.setChats(this.route.snapshot.data.chats);
  }

  ngOnInit(): void {
    this.socketService.subscribeMessages().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((message: Message) => {
      if (!this.isMinePipe.transform(message)) {
        if (message.chatId !== this.chatService.currentChatId) {
          const chats = this.chatService.chats;
          const found = chats.find(x => x.id === message.chatId);
          found.unread = found.unread || 0;
          found.unread += 1;
          this.chatService.setChats(chats);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
