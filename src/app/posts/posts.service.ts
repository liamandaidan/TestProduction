import { Post } from './../interfaces/Post';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  addPost(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }

  getPosts(): void {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3001/api/posts'
      )
      .subscribe((PostData) => {
        this.posts = PostData.posts;
        //This informs our app on update. We pass a copy of posts along the chain
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
