import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categories: any[]= [];
  //updatedCategory: any = {};
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId!: string;

  constructor(private categoryService : CategoriesService){
  }
  ngOnInit(): void {
    this.categoryService.getData().subscribe(value =>{
      this.categories = value;
     // console.log(value);
    })
 
  }

  onSubmit(f: NgForm){
    let categoryData : Category = {
      category: f.value.category 
    }
    if (this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
      f.reset();
    
    }else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId, categoryData);
      this.formStatus = 'Add';
    }
  }
  getCategories(){
    this.categoryService.getData().subscribe(categories=>{
      this.categories = this.categories;
      //console.log(categories);
    })
  }
  updateCategory(category: string, id: string){
    //this.categoryService.updateData(categoryId, this.updatedCategory).then(()=>{
     // this.getCategories();
     // this.updatedCategory = {}
   // })
   this.formCategory = category
   this.formStatus = 'Edit'
   this.categoryId = id
  }

  deleteCategory(categoryId: any){
    //console.log(categoryId);
    this.categoryService.deleteData(categoryId).then(()=>{
      console.log(categoryId);
    })
  }

}
