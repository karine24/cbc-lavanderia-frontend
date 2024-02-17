import { Component } from '@angular/core';
import { LOCAL_STORAGE_KEY } from 'src/app/constants/local-storage-key.constant';
import { TitleContent } from 'src/app/models/home/title-content.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { map } from 'rxjs/operators';
import { Stores } from 'src/app/models/home/stores.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent {
  constructor(
    private titleContentService: TitleContentService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
  ) {}

  titleContentId = '';
  storesData: Stores = {
    storesAddressesContent: [''],
    storesNeighborhoodsContent: [''],
    storesPhonesContent: ['']
  }
  isLoggedIn = this.authService.isLogged;

  ngOnInit() {
    console.log('entrou ngOnInit stores');
    const localStorageData: TitleContent = 
      this.localStorageService.get(LOCAL_STORAGE_KEY.websiteContent);

    if (localStorageData) {
      console.log('usou localStorageData - stores');
      this.storesData = localStorageData;
      this.titleContentId = localStorageData.id;
    } else {
      this.titleContentService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(change =>
            ({ ...change.payload.doc.data(), id: change.payload.doc.id })
          )
        )
      ).subscribe(data => {
        console.log(data);
        this.storesData = data[0];
        this.titleContentId = data[0].id;
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.storesData, id: this.titleContentId, updatedAt: new Date()});
      });
    }
  }

  onSave() {
    if (this.titleContentId) {
      console.log('entrou');
      console.log(this.titleContentId);
      console.log(this.storesData);
      this.titleContentService.update(this.titleContentId, this.storesData)
      .then(() => {
        console.log(this.storesData.storesAddressesContent[0]);
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.storesData, id: this.titleContentId, updatedAt: new Date()});
        alert('Dados atualizados com sucesso!');
      })
      .catch(err => {
        alert('Erro ao atualizar os dados.');
        console.log(err);}
      )
        
    }
    console.log(this.isLoggedIn);
    console.log('Salvando dados...');
  }

  deleteTableElement(index: number) {
    this.storesData.storesNeighborhoodsContent.splice(index, 1);
    this.storesData.storesAddressesContent.splice(index, 1);
    this.storesData.storesPhonesContent.splice(index, 1);
  }

  addTableElement() {
    this.storesData.storesNeighborhoodsContent.push('');
    this.storesData.storesAddressesContent.push('');
    this.storesData.storesPhonesContent.push('');
  }

  trackByIndex (index: number) { 
    return index 
  }

}
