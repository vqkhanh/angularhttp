import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { PostService } from '../../services/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PostsComponent,
       ],
       imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
       providers: [
        PostService,
        
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('count most words used accur in text', () => {
    let texts = "To achieve and maintain such distinction in food and wine";
    const ret = component.countWords(texts);
    expect(ret.length).toEqual(3);
  });


});
