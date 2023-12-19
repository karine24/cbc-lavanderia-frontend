import { Company } from "./company.model";
import { Footer } from "./footer.model";
import { Home } from "./home.model";

export interface TitleContent extends Home, Company, Footer {
    id: string;
    storesAddressesContent: string[];
    storesNeighborhoodsContent: string[];
    storesPhonesContent: string[];
}