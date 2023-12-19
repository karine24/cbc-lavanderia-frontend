import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/home/home.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private titleContentService: TitleContentService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

    titleContentServiceId = '';
    homeData: Home = {
    homeInfoTitle: '',
    homeInfoContent: '',
    hintTitle: '',
    hintContent: '',
  }
  isInternalPage = this.router.url.includes("internal");

  ngOnInit() {
    console.log('entrou');
    this.titleContentService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(change =>
          ({ ...change.payload.doc.data(), id: change.payload.doc.id })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.homeData = data[0];
      this.titleContentServiceId = data[0].id;
      this.localStorageService.set('title-content', {...this.homeData, id: this.titleContentServiceId});
    });
  }

  onSave() {
    if (this.titleContentServiceId) {
      console.log('entrou');
      console.log(this.titleContentServiceId);
      console.log(this.homeData);
      this.titleContentService.update(this.titleContentServiceId, this.homeData)
      .then(() => {
        this.localStorageService.set('title-content', {...this.homeData, id: this.titleContentServiceId});
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
