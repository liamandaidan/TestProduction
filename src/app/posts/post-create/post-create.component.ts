import { Post } from './../../interfaces/Post';
import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  // @Output() postCreated = new EventEmitter<Post>();
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}
  private mode = 'create';
  private postId: string = '';
  public post!: Post;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId') || '';
        console.log('post id for edit is: ' + this.postId);
        this.postsService.getPost(this.postId).subscribe((obj) => {
          let temp = obj.post[0];
          this.post = {
            title: temp.title,
            content: temp.content,
            id: temp._id,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm): void {
    if (form.invalid) return;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
