import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Company } from 'src/app/models/home/company.model';
import { Home } from 'src/app/models/home/home.model';
import { TitleContent } from 'src/app/models/home/title-content.model';

@Injectable({
  providedIn: 'root'
})
export class TitleContentService {
  private dbPath = '/title-content';
  homeRef: AngularFirestoreCollection<TitleContent>;

  constructor(private db: AngularFirestore) { 
    this.homeRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<TitleContent> {
    return this.homeRef;
  }

  update(id: string, data: Home | Company): Promise<void> {
    console.log(`data: ${JSON.stringify(data)}`)
    const teste = this.homeRef.doc(id).update({ ...data });
    // const teste = this.homeRef.doc(id).update({ homeInfoTitle: 'data' });
    console.log(teste);
    return teste;
  }
}
