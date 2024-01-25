import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LOCAL_STORAGE_KEY } from 'src/app/constants/local-storage-key.constant';
import { PricesTypeEnum } from 'src/app/enums/prices-type.enum';
import { PricesDetails } from 'src/app/models/home/prices-details.model';
import { TitleContent } from 'src/app/models/home/title-content.model';
import { TitleContentService } from 'src/app/services/home/title-content.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices-details.component.html',
  styleUrls: ['./prices-details.component.css']
})
export class PricesDetailsComponent implements OnInit {
  constructor(
    private titleContentService: TitleContentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  titleContentId = '';
  pageData: PricesDetails = {
    pricesKiloItens: [],
    pricesKiloValues: [],
    pricesFemaleItens: [],
    pricesFemaleValues: [],
    pricesMaleItens: [],
    pricesMaleValues: [],
    pricesChildrenItens: [],
    pricesChildrenValues: [],
    pricesCouchItens: [],
    pricesCouchValues: [],
    pricesRugItens: [],
    pricesRugValues: [],
    pricesCurtainItens: [],
    pricesCurtainValues: [],
    pricesBedItens: [],
    pricesBedValues: [],
    pricesTrussardiItens: [],
    pricesTrussardiValues: [],
    pricesOthersItens: [],
    pricesOthersValues: [],
  }
  pricesItens: string[] = [];
  pricesValues: string[] = [];
  isInternalPage = this.router.url.includes("internal");
  type: string | null = '';
  typeName: string = '';

  ngOnInit() {
    console.log('entrou ngOnInit price-details');
    this.activatedRoute.queryParamMap.subscribe((param) => this.type = param.get('type'));
    this.setTypeName()
    
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

    this.setPrices();
  }

  onSave() {
    if (this.titleContentId) {
      this.setPageData();
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

  deleteTableElement(index: number) {
    this.pricesItens.splice(index, 1);
  }

  addTableElement() {
    this.pricesItens.push('');
  }

  trackByIndex (index: number) { 
    return index 
  }

  private setTypeName(): void {
    switch (this.type) {
      case PricesTypeEnum.KILO: 
        this.typeName = 'Quilo';
        break;
      case PricesTypeEnum.FEMALE: 
        this.typeName = 'Feminino';
        break;
      case PricesTypeEnum.MALE: 
        this.typeName = 'Masculino';
        break;
      case PricesTypeEnum.CHILDREN: 
        this.typeName = 'Infantil';
        break;
      case PricesTypeEnum.CHOUCH: 
        this.typeName = 'Estofado';
        break;
      case PricesTypeEnum.RUG: 
        this.typeName = 'Tapete';
        break;
      case PricesTypeEnum.CURTAIN: 
        this.typeName = 'Cortina';
        break;
      case PricesTypeEnum.BED: 
        this.typeName = 'Cama/Mesa';
        break;
      case PricesTypeEnum.TROUSSARDI: 
        this.typeName = 'Trussardi';
        break;
      case PricesTypeEnum.OTHERS: 
      this.typeName = 'Diversos';
        break;
    }
  }

  private setPrices(): void {
    switch (this.type) {
      case PricesTypeEnum.KILO: 
        this.pricesItens = this.pageData.pricesKiloItens;
        this.pricesValues = this.pageData.pricesKiloValues;
        break;
      case PricesTypeEnum.FEMALE: 
        this.pricesItens = this.pageData.pricesFemaleItens;
        this.pricesValues = this.pageData.pricesFemaleValues;
        break;
      case PricesTypeEnum.MALE: 
        this.pricesItens = this.pageData.pricesMaleItens;
        this.pricesValues = this.pageData.pricesMaleValues;
        break;
      case PricesTypeEnum.CHILDREN: 
        this.pricesItens = this.pageData.pricesChildrenItens;
        this.pricesValues = this.pageData.pricesChildrenValues;
        break;
      case PricesTypeEnum.CHOUCH: 
        this.pricesItens = this.pageData.pricesCouchItens;
        this.pricesValues = this.pageData.pricesCouchValues;
        break;
      case PricesTypeEnum.RUG: 
        this.pricesItens = this.pageData.pricesRugItens;
        this.pricesValues = this.pageData.pricesRugValues;
        break;
      case PricesTypeEnum.CURTAIN: 
        this.pricesItens = this.pageData.pricesCurtainItens;
        this.pricesValues = this.pageData.pricesCurtainValues;
        break;
      case PricesTypeEnum.BED: 
        this.pricesItens = this.pageData.pricesBedItens;
        this.pricesValues = this.pageData.pricesBedValues;
        break;
      case PricesTypeEnum.TROUSSARDI: 
        this.pricesItens = this.pageData.pricesTrussardiItens;
        this.pricesValues = this.pageData.pricesTrussardiValues;
        break;
      case PricesTypeEnum.OTHERS: 
        this.pricesItens = this.pageData.pricesOthersItens;
        this.pricesValues = this.pageData.pricesOthersValues;
        break;
    }
  }

  private setPageData(): void {
    switch (this.type) {
      case PricesTypeEnum.KILO: 
        this.pageData.pricesKiloItens = this.pricesItens;
        this.pageData.pricesKiloValues = this.pricesValues;
        break;
      case PricesTypeEnum.FEMALE: 
        this.pageData.pricesFemaleItens = this.pricesItens;
        this.pageData.pricesFemaleValues = this.pricesValues;
        break;
        case PricesTypeEnum.MALE: 
        this.pageData.pricesMaleItens = this.pricesItens;
        this.pageData.pricesMaleValues = this.pricesValues;
        break;
      case PricesTypeEnum.CHILDREN: 
        this.pageData.pricesChildrenItens = this.pricesItens;
        this.pageData.pricesChildrenValues = this.pricesValues;
        break;
      case PricesTypeEnum.CHOUCH: 
        this.pageData.pricesCouchItens = this.pricesItens;
        this.pageData.pricesCouchValues = this.pricesValues;
        break;
      case PricesTypeEnum.RUG: 
        this.pageData.pricesRugItens = this.pricesItens;
        this.pageData.pricesRugValues = this.pricesValues;
        break;
      case PricesTypeEnum.CURTAIN: 
        this.pageData.pricesCurtainItens = this.pricesItens;
        this.pageData.pricesCurtainValues = this.pricesValues;
        break;
      case PricesTypeEnum.BED: 
        this.pageData.pricesBedItens = this.pricesItens;
        this.pageData.pricesBedValues = this.pricesValues;
        break;
      case PricesTypeEnum.TROUSSARDI: 
        this.pageData.pricesTrussardiItens = this.pricesItens;
        this.pageData.pricesTrussardiValues = this.pricesValues;
        break;
      case PricesTypeEnum.OTHERS: 
        this.pageData.pricesOthersItens = this.pricesItens;
        this.pageData.pricesOthersValues= this.pricesValues;
        break;
    }
  }

}
