import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { ROUTES } from '../../core/data/routes';

@Component({
  selector: 'job-hub-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ROUTES = ROUTES;
  partners = [
    {image: 'assets/images/logos/icpi.svg', name: 'icpi'},
    {image: 'assets/images/logos/techo-pro.svg', name: 'techo-pro'},
    {image: 'assets/images/logos/belgard.svg', name: 'belgard'},
    {image: 'assets/images/logos/versalok.svg', name: 'versalok'},
    {image: 'assets/images/logos/cambridge.svg', name: 'cambridge'},
  ];

  posts = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.posts = this.blogService.getRecentPosts();
  }

}
