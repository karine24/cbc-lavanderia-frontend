import { Company } from "./company.model";
import { Footer } from "./footer.model";
import { Hints } from "./hints.model";
import { Home } from "./home.model";
import { PricesDetails } from "./prices-details.model";
import { Prices } from "./prices.model";
import { Stores } from "./stores.model";

export interface TitleContent extends Home, Company, Footer, Stores, Prices, PricesDetails, Hints {
    id: string;
}