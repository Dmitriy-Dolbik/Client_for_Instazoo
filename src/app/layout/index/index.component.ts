import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {ImageUploadService} from "../../services/image-upload.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostsLoaded = false;
  posts: Post[];
  isUserDataLoaded = false;
  user: User;
  valueMessage = '';

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageService: ImageUploadService) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isPostsLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.imageService.getImageToPost(p.id!)
        .subscribe(data => {
          p.image = data.imageBytes;
        })
    });
  }

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentsToPost(p.id as number)
        .subscribe(data => {
          p.comments = data
        })
    });
  }

  likePost(postId: number | undefined, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);

    if (!post.likedUsers?.includes(this.user.username)) {
      this.postService.likePost(postId!, this.user.username)
        .subscribe(() => {
          post.likedUsers?.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        })
    } else {
      this.postService.likePost(postId as number, this.user.username)
        .subscribe(() => {
          const index = post.likedUsers?.indexOf(this.user.username, 0);
          if (index && index > -1) {
            post.likedUsers?.splice(index, 1);
          }
        });
    }
  }

  /*postComment(message: KeyboardEvent, postId: number | undefined, postIndex: number): void {
    const post = this.posts[postIndex];

    console.log(post);

    this.valueMessage += (message.target as HTMLInputElement).value;

    this.commentService.addToCommentToPost(postId as number, this.valueMessage)
      .subscribe(data => {
        console.log(data);
        post.comments?.push(data);
      })
  }*/
  postComment(message: string, postId: number | undefined, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);
    this.commentService.addToCommentToPost(postId as number, message)
      .subscribe(data => {
        console.log(data);
        post.comments?.push(data);
      })
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
