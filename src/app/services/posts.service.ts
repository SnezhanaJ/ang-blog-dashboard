import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { getStorage, ref, deleteObject ,getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: Firestore, private router: Router) { }
  
  saveData(postData : any){
    const collectionInstance = collection(this.afs, 'posts');
    addDoc(collectionInstance, postData).then(ref =>{
       console.log('success');
       this.router.navigate(['/posts']);
    });
    }

    
  getData(): Observable<any[]> {
    const collectionInstance = collection(this.afs, 'posts');
    return collectionData(collectionInstance, {idField: 'id'});
 }
  loadOneData(id: any){
    const docInstance = doc(this.afs, 'posts', id);
    return docData(docInstance);
  }
 
 deleteData(postId: string){
  const postsDoc = doc(this.afs, 'posts', postId);
  return deleteDoc(postsDoc);
}
updateData(postId: string, updatedPost: any){
  const postsDoc = doc(this.afs, 'posts', postId);
  updateDoc(postsDoc, updatedPost).then(()=>{
    this.router.navigate(['/posts']);
    console.log(postId);
  }
  )
}
markFeatured(id:string, featuredData: any){
  const postsDoc = doc(this.afs, 'posts', id);
  updateDoc(postsDoc, featuredData);
}

storage = getStorage();

uploadImage(selectedImage: any, postData: any, formStatus: string, id: any){
  const filePath = `postIMG/${Date.now()}`;
  const storageRef = ref(this.storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, selectedImage);
  uploadTask.then((snapshot)=>{
    return getDownloadURL(snapshot.ref);
  }).then((downloadURL)=>{
    console.log('Download url', downloadURL);
    postData.postImgPath = downloadURL;
    if(formStatus== "Add New"){
      this.saveData(postData);
    }else if(formStatus=="Edit"){
      this.updateData(id,postData);
    }
    
  });
}

deleteImage(imagePath: string, postId: string){
    const storageRef = ref(this.storage, imagePath);
    deleteObject(storageRef).then(()=>{
      this.deleteData(postId);
      console.log("deleted");
  });
}

}
