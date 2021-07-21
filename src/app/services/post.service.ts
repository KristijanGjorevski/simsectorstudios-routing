import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../Post';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5000/posts';

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  deletePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;

    return this.http.delete<Post>(url);
  }

  getById(id: string) {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, httpOptions);
  }

  updatePost(id: string, params: Post): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.put<Post>(url, params);
  }
}
