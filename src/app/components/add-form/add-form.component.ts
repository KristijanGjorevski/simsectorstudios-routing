import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/Post';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
  @Output() onAddPost: EventEmitter<Post> = new EventEmitter();
  id!: string;
  form!: FormGroup;
  isAddMode!: boolean;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.postService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  onSubmit() {
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.postService
      .addPost(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  private updateUser() {
    this.postService
      .updatePost(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
