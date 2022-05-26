import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: [] | any; 

  constructor(httpClient: HttpClient) { 
    httpClient.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(res => {
        this.posts = res;
      })
  }

  ngOnInit(): void {
  }

}
