import { Component } from '@angular/core';
import { Post } from './interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  title = 'Test Based Production';
  StoredPosts: Post[] = [];

  onPostAdd(post: Post) {
    this.StoredPosts.push(post);
  }
}
