import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularEditorModule, 
    HttpClientModule, ReactiveFormsModule,
     AngularFireStorageModule, RouterModule],
  providers: [],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {
  ngOnInit(): void {
    this.categoryService.getData().subscribe(value =>{
      this.categories = value;
     // console.log(value);
    })
  }
  permalink: string = '';
  imgSrc: any ='./assets/image-placeholder.png';
  selectedImg: any;
 
  categories: any[]= [];
  postForm!: FormGroup;

  post:any;
  formStatus: string = 'Add New';
  docId!: string ;

  constructor(private categoryService: CategoriesService,
     private fb: FormBuilder,
      private postService: PostsService,
      private route: ActivatedRoute){

        this.route.queryParams.subscribe(val => {
          this.docId = val['id']
          if(this.docId){
            this.postService.loadOneData(val['id']).subscribe(value => {
              this.post = value;
              this.postForm = this.fb.group({
                title: [this.post.title, [Validators.required, Validators.minLength(10)]],
                permalink: [this.post.permalink, Validators.required],
                excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
                category: [`${this.post.category.id}-${this.post.category.category}`, Validators.required],
                postImg: ['', Validators.required],
                content: [this.post.content, Validators.required]
              })
              this.imgSrc = this.post.postImgPath;
              this.formStatus = 'Edit';
            });
          }else {
            this.postForm = this.fb.group({
              title: ['', [Validators.required, Validators.minLength(10)]],
              permalink: ['', Validators.required],
              excerpt: ['', [Validators.required, Validators.minLength(50)]],
              category: ['', Validators.required],
              postImg: ['', Validators.required],
              content: ['', Validators.required]
            })
            this.formStatus = 'Add New';
          }

      
        });

  }

  get fc(){
    return this.postForm.controls;
  }

  onTitleChanged($event: any){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
  }

  showPreview($event: any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImg = $event.target.files[0];
    }

  async onSubmit(){
    console.log(this.postForm.value);
    let splited = this.postForm.value.category.split('-');
    let dateNow = new Date();


    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        category: splited[1],
        id: splited[0]
      },
      postImgPath: '',
      //'/assets/categoryimage.jpg',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: dateNow,
      dateString: dateNow.toDateString(),
    }
    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);

    
  }

  deletePost(postId:string){
    this.postService.deleteData(postId);
  }


}
