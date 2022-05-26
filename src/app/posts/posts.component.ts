import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: [] | any; 
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { 
    httpClient.get(this.url)
      .subscribe(res => {
        this.posts = res;
      })

      
  }

  createPost(input: HTMLInputElement){

    let post: any = {};
    post['title'] = input.value;
    input.value = '';

    this.httpClient.post(this.url, JSON.stringify(post))
      .subscribe( (res: any)  => {
        post['id'] = res.id;
        this.posts.splice(0, 0, post);
        // this.posts.unshift(post);
      })
  }

  ngOnInit(): void {
  }

}
