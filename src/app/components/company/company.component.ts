import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE_KEY } from 'src/app/constants/local-storage-key.constant';
import { Company } from 'src/app/models/home/company.model';
import { TitleContent } from 'src/app/models/home/title-content.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  constructor(
    private titleContentService: TitleContentService,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  titleContentServiceId = '';
  companyData: Company = {
    companyTitle: '',
    companyContent: '',
  }
  isLoggedIn = this.authService.isLogged;

  ngOnInit() {
    console.log('entrou');
    const localStorageData: TitleContent = 
      this.localStorageService.get(LOCAL_STORAGE_KEY.websiteContent);

    if (localStorageData) {
      console.log('usou localStorageData');
      this.companyData = localStorageData;
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
        this.companyData = data[0];
        // this.companyData.companyContent = this.companyData.companyContent.replace("\\n", "\n")
        this.titleContentServiceId = data[0].id;
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.companyData, id: this.titleContentServiceId, updatedAt: new Date()});
      });
    }    
  }

  onSave() {
    if (this.titleContentServiceId) {
      console.log('entrou');
      console.log(this.titleContentServiceId);
      console.log(this.companyData);
      this.titleContentService.update(this.titleContentServiceId, this.companyData)
      .then(() => {
        this.localStorageService.set(LOCAL_STORAGE_KEY.websiteContent, 
          {...this.companyData, id: this.titleContentServiceId, updatedAt: new Date()});
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
