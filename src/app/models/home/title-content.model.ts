import { Company } from "./company.model";
import { Footer } from "./footer.model";
import { Home } from "./home.model";
import { Prices } from "./prices.model";
import { Stores } from "./stores.model";

export interface TitleContent extends Home, Company, Footer, Stores, Prices {
    id: string;
}