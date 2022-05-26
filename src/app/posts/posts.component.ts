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

  updatePost(post: any){
    this.httpClient.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(res =>{
        console.log("res:",res);
      });
  }

  deletePost(post: any){
    this.httpClient.delete(this.url + '/' + post.id)
      .subscribe(res =>{
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

  ngOnInit(): void {
  }

}
