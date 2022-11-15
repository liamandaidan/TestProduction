import { PostsService } from './../posts.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../../interfaces/Post';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {

  // @Output() postCreated = new EventEmitter<Post>();
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onAddPost(form: NgForm): void {
    if (form.invalid) return;
    this.postsService.addPost(form.value.title, form.value.content);
    // this.postCreated.emit(post);
  }
}
