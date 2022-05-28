import { NotFoundError } from '../../common/not-found-error';
import { AppError } from '../../common/app-error';
import { PostService } from '../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    ngOnInit(): void {
      this.random();
    }

    form: FormGroup;
    arrTopTenWords = ['the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it'];
    arrOcu: any = [];

  constructor(fb: FormBuilder, private service: PostService) {
    this.form = fb.group({
      urls: ['', 
        Validators.required
      ],
      description: '',
    }
    );
    this.setUrl();
  }

  getAll(url: string){
    this.arrOcu = [];
    this.service.getAll(url)
      .subscribe({
        next: (res: any) => {
          this.display(res);
        }, // success path
        error:(error: AppError) => {
          if (error instanceof NotFoundError){
            alert("Not ound.");
          }
        }, // error path
      });
  }

  display(data: any){
    this.form.patchValue({description: data?.description}); 
    this.countWords(data?.description);
  }

  countWords(text: string) {
    if(!text || text.length == 0){
      return [];
    }
    
    text = text.toLocaleLowerCase();
    let words:any = text.match(/\w+/g);
    let occurances:any = [];

    for (let word of words) {
      if (occurances[word]) {
        occurances[word]++;
      } else {
        occurances[word] = 1;
      }
    }

    for (let word of this.arrTopTenWords) {
      if (occurances[word] > 0) {
        let obj: any = {};
        obj['occurances'] = occurances[word];
        obj['word'] = word;
        this.arrOcu.push(obj);
      }
    }
    return this.arrOcu;
  }

  random(){
    let url: any = '';
    url = this.form.get('urls')?.value;
    this.getAll(url);
  }

  setUrl(){
    this.form.patchValue({urls: 'https://random-data-api.com/api/restaurant/random_restaurant'})
  }

  get description(){
    return this.form.patchValue({description: 'SG'}); 
  }

  get urls() { return this.form.get('urls'); }


}

