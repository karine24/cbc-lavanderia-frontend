import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LOCAL_STORAGE_KEY } from 'src/app/constants/local-storage-key.constant';
import { Prices } from 'src/app/models/home/prices.model';
import { TitleContent } from 'src/app/models/home/title-content.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.css']
})
export class PricesTableComponent implements OnInit {
  constructor(
    private titleContentService: TitleContentService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  titleContentId = '';
  pageData: Prices = {
    pricesHintContent: '',
  }
  isInternalPage = this.router.url.includes("internal");

  ngOnInit() {
    console.log('entrou ngOnInit home');
    const localStorageData: TitleContent = 
      this.localStorageService.get(LOCAL_STORAGE_KEY.websiteContent);

    if (localStorageData) {
      console.log('usou localStorageData - prices1');
      this.pageData = localStorageData;
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
        this.pageData = data[0];
        this.titleContentId = data[0].id;
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.pageData, id: this.titleContentId, updatedAt: new Date()});
      });
    }
  }

  onSave() {
    if (this.titleContentId) {
      console.log('entrou');
      console.log(this.titleContentId);
      console.log(this.pageData);
      this.titleContentService.update(this.titleContentId, this.pageData)
      .then(() => {
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.pageData, id: this.titleContentId, updatedAt: new Date()});
        alert('Dados atualizados com sucesso!');
      })
      .catch(err => {
        alert('Erro ao atualizar os dados.');
        console.log(err);}
      )
        
    }
    console.log(this.isInternalPage);
    console.log('Salvando dados...');
  }

}
