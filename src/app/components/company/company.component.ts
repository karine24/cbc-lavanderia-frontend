import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/models/home/company.model';
import { TitleContent } from 'src/app/models/home/title-content.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  constructor(
    private titleContentService: TitleContentService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  titleContentServiceId = '';
  companyData: Company = {
    companyTitle: '',
    companyContent: '',
  }
  isInternalPage = this.router.url.includes("internal");

  ngOnInit() {
    console.log('entrou');
    const localStorageData: TitleContent = this.localStorageService.get('title-content');

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
        this.localStorageService.set('title-content', {...this.companyData, id: this.titleContentServiceId});
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
        this.localStorageService.set('title-content', {...this.companyData, id: this.titleContentServiceId});
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
