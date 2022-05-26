import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: [] | any; 
  

  constructor(private service: PostService) { 
    this.service.getPost()
      .subscribe(res => {
        this.posts = res;
      })

      
  }

  createPost(input: HTMLInputElement){

    let post: any = {};
    post['title'] = input.value;
    // input.value = '';

    this.service.createPost(post)
      .subscribe( (res: any)  => {
        post['id'] = res.id;
        this.posts.splice(0, 0, post);
        // this.posts.unshift(post);
        input.value = '';
      })
  }

  updatePost(post: any){
    this.service.updatePost(post)
      .subscribe(res =>{
        console.log("res:",res);
      });
  }

  deletePost(post: any){
    this.service.deletePost(post.id)
      .subscribe(res =>{
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

  ngOnInit(): void {
  }

}
