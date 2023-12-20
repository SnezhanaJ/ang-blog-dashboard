import { Injectable } from '@angular/core';
import { collection, updateDoc,deleteDoc, doc, addDoc, Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: Firestore) { }

  saveData(f : any){
    const collectionInstance = collection(this.afs, 'categories');
    addDoc(collectionInstance, f).then(ref =>{
      //this.toastr.success("New Category Saved Successfully");
       console.log('success');
    });
   // this.afs.collection('categories').add(f).then(ref=>{
     // console.log("success");
    //})
  }

  getData(): Observable<any[]> {
     const collectionInstance = collection(this.afs, 'categories');
     return collectionData(collectionInstance, {idField: 'id'});
  }

  updateData(categoryId: string, updatedCategory: any){
    const categoryDoc = doc(this.afs, 'categories', categoryId);
    return updateDoc(categoryDoc, updatedCategory);
   //this.afs.doc('categories/'+categoryId).update({category:updatedCategory});
  }

  deleteData(categoryId: string){
    const categoryDoc = doc(this.afs, 'categories', categoryId);
    return deleteDoc(categoryDoc);
  }

}
