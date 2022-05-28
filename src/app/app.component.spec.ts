import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostService } from './services/post.service';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './common/app-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PostsComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
      ],
      providers: [
        PostService,
        {provide: ErrorHandler, useClass: AppErrorHandler}
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
