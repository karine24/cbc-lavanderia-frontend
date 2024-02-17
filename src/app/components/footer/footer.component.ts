import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LOCAL_STORAGE_KEY } from 'src/app/constants/local-storage-key.constant';
import { Footer } from 'src/app/models/home/footer.model';
import { TitleContent } from 'src/app/models/home/title-content.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(
    private titleContentService: TitleContentService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  titleContentServiceId = '';
  footerData: Footer = {
    footerScheduleContent: '',
    footerContactPhonesContent: '',
  }
  isLoggedIn = this.authService.isLogged;

  ngOnInit() {
    console.log('entrou footer');
    console.log(this.router.url);
    const localStorageData: TitleContent = 
      this.localStorageService.get(LOCAL_STORAGE_KEY.websiteContent);

    if (localStorageData) {
      console.log('usou localStorageData');
      this.footerData = localStorageData;
      this.titleContentServiceId = localStorageData.id;
    } else {
      this.titleContentService.getAll().snapshotChanges().pipe(
        map((changes) =>
          changes.map(change =>
            ({ ...change.payload.doc.data(), id: change.payload.doc.id })
          )
        )
      ).subscribe(data => {
        console.log(data);
        this.footerData = data[0];
        // this.footerData.footerContent = this.footerData.footerContent.replace("\\n", "\n")
        this.titleContentServiceId = data[0].id;
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.footerData, id: this.titleContentServiceId, updatedAt: new Date()});
      });
    }    
  }

  onSave() {
    if (this.titleContentServiceId) {
      console.log('entrou');
      console.log(this.titleContentServiceId);
      console.log(this.footerData);
      this.titleContentService.update(this.titleContentServiceId, this.footerData)
      .then(() => {
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.footerData, id: this.titleContentServiceId, updatedAt: new Date()});
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
