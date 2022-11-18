import { PostsService } from './../posts.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../../interfaces/Post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private PostSub!: Subscription;
  constructor(private postService: PostsService) {}
  ngOnDestroy(): void {
    this.PostSub.unsubscribe();
  }
  ngOnInit(): void {
    this.postService.getPosts();
    this.PostSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }
}
