import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: [] | any; 
  

  constructor(private service: PostService) {}

  // createPost(input: HTMLInputElement){
  //   let post: any = {};
  //   post['title'] = input.value;
  //   // input.value = '';

  //   this.service.createPost(post)
  //     .subscribe( (res: any)  => {
  //       post['id'] = res.id;
  //       this.posts.splice(0, 0, post);
  //       // this.posts.unshift(post);
  //       input.value = '';
  //     })
  // }

  createPost(input: HTMLInputElement){
    let post: any = {};
    post['title'] = input.value;
    input.value = '';

    this.service.create(post)
    .subscribe({
      next: (res: any) => {
        post['id'] = res.id;
        this.posts.splice(0, 0, post);
        // this.posts.unshift(post);
      }, // success path
      error:(error: AppError) => {
        if (error instanceof BadInput){
          alert("Not Found");
        }else throw error;
      }, // error path
    });
  }

  // updatePost(post: any){
  //   this.service.updatePost(post)
  //     .subscribe(res =>{
  //       console.log("res:",res);
  //     });
  // }

  updatePost(post: any){
    this.service.update(post)
    .subscribe({
      next: (res) => console.log("res:",res), // success path
      error:(error: AppError) => {
        if (error instanceof NotFoundError){
          alert("Not Found");
        }else throw error;
      }, // error path
    });
  }


  // deletePost(post: any){
  //   this.service.deletePost(post.id)
  //     .subscribe(res =>{
  //       const index = this.posts.indexOf(post);
  //       this.posts.splice(index, 1);
  //     });
  // }

  deletePost(post: any){
    this.service.delete(1345)
    .subscribe({
      next: (res) => {
        console.log("123")
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);}, // success path
      error:(error: AppError) => {
        console.log("345")
        if (error instanceof NotFoundError){
          alert("Bad request");
        }else throw error;
      }, // error path
    });
  }

  // ngOnInit(): void {
  //   this.service.getPost()
  //     .subscribe(res => {
  //       this.posts = res;
  //     })
  // }

  ngOnInit(): void {
    this.service.getAll()
    .subscribe({
      next: (res) => this.posts = res, // success path
      error:(error: AppError) => {
        if (error instanceof NotFoundError){
          alert("Not ound.");
        }else{
          
        }
      }, // error path
    });
  }


}
