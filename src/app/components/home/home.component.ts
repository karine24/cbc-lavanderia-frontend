import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/home/home.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { LOCAL_STORAGE_KEY } from 'src/app/constants/local-storage-key.constant';
import { TitleContent } from 'src/app/models/home/title-content.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private titleContentService: TitleContentService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
  ) {}

  titleContentId = '';
  homeData: Home = {
    homeInfoTitle: '',
    homeInfoContent: '',
    hintTitle: '',
    hintContent: '',
  }
  isLoggedIn = this.authService.isLogged;

  ngOnInit() {
    console.log('isLoggedIn: ' + this.isLoggedIn);
    console.log('entrou ngOnInit home');
    const localStorageData: TitleContent = 
      this.localStorageService.get(LOCAL_STORAGE_KEY.websiteContent);

    if (localStorageData) {
      console.log('usou localStorageData - home');
      this.homeData = localStorageData;
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
        this.homeData = data[0];
        this.titleContentId = data[0].id;
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.homeData, id: this.titleContentId, updatedAt: new Date()});
      });
    }
  }

  onSave() {
    if (this.titleContentId) {
      console.log('entrou');
      console.log(this.titleContentId);
      console.log(this.homeData);
      this.titleContentService.update(this.titleContentId, this.homeData)
      .then(() => {
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.homeData, id: this.titleContentId, updatedAt: new Date()});
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

}
