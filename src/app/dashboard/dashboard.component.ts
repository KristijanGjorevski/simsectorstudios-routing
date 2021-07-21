import { Component, OnInit } from '@angular/core';
import { Post } from '../Post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  readonly post = { title: 'isjdks', body: 'jnsajn' };
  postList: Array<Post>;
  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  addPost(): void {
    this.postService.addPost(this.post).subscribe((post) => {
      console.log(post);
    });
    console.log('jsndjs');
  }

  getAllPosts(): void {
    this.postService.getPosts().subscribe((postList) => {
      this.postList = postList;
      console.log('yolo get', this.postList);
    });
  }
}
