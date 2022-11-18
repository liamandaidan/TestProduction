import { Post } from './../interfaces/Post';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  addPost(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3001/api/posts',
        post
      )
      .subscribe((resp) => {
        const id = resp.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  getPosts(): void {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3001/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map(
            (post: { title: any; content: any; _id: any }) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
              };
            }
          );
        })
      )
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        //This informs our app on update. We pass a copy of posts along the chain
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  deletePost(postId: string): void {
    this.http
      .delete('http://localhost:3001/api/posts/' + postId)
      .subscribe(() => {
        //return all updated posts besides one deleted
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        //update all posts to above
        this.posts = updatedPosts;
        //pass a copied ref
        this.postUpdated.next([...this.posts]);
      });
  }
}
