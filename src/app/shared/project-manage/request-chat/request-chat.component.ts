import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserRole } from '../../../core/models/auth';
import { ROUTES } from '../../../core/data/routes';
import { ToastrService } from '../../../core/services/toastr.service';
import { ChatService } from '../../../core/services/chat.service';
import { Project } from '../../../core/models/project';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'job-hub-request-chat',
  templateUrl: './request-chat.component.html',
  styleUrls: ['./request-chat.component.scss']
})
export class RequestChatComponent implements OnInit {

  @Input() user: User;
  @Input() project: Project;
  @Input() allowViewProfile = false;
  @Input() readonly = false;
  @Input() userRole: string;

  isLoading = false;

  ROUTES = ROUTES;

  constructor(
    private toastr: ToastrService,
    private chatService: ChatService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // const user = this.authService.user;
    // if (user.role === UserRole.SuperAdmin) {
    //   if (this.project.assignedContractor.id === user.id) {
    //     this.showRequestButton = true;
    //   }
    // } else if (user.role === UserRole.Contractor) {
    //   if (this.project.assignedContractor.id === user.id) {
    //     this.showRequestButton = true;
    //   }
    // } else {
    //   this.showRequestButton = true;
    // }
  }

  async sendMessage() {
    try {
      this.isLoading = true;
      const res = await this.chatService.initChat(this.project.id).toPromise();
      if (this.user.role === UserRole.Customer) {
        this.router.navigate([ROUTES.admin.root, ROUTES.common.inbox, res.id]);
      } else {
        this.router.navigate([ROUTES.app.root, ROUTES.common.inbox, res.id]);
      }
    } catch (e) {
      this.toastr.error(e, 'Sorry, failed to open conversation with agency. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

}
