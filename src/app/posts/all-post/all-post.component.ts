import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent implements OnInit {

  constructor(private postService: PostsService, private afs: Firestore){}

  posts: any[]=[];

  ngOnInit(): void {
    this.postService.getData().subscribe(value =>{
      this.posts = value;
      //console.log(value);
    })
  }
  deletePost(imagePath:string ,postId: string){
     this.postService.deleteImage(imagePath,postId);
  }
  onFeatured(postId: string,value: boolean){
    const featuredData ={
      isFeatured : value
    }
    this.postService.markFeatured(postId, featuredData);
  }
}
