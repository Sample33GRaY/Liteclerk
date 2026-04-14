import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { Products } from './pages/products/products';
import { Partners } from './pages/partners/partners';
import { Contact } from './pages/contact/contact';

// Add these imports for your product components
import { Desktop } from './products/desktop/desktop';
import { Mobile} from './products/mobile/mobile';
import { Syspro } from './products/syspro/syspro';
import { Fis } from './products/fis/fis';
import { His } from './products/his/his';
import { Humidefi } from './products/humidefi/humidefi';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: Products },
  { path: 'partners', component: Partners },
  { path: 'contact', component: Contact },
  
  // Specific product pages
  { path: 'product/desktop', component: Desktop },
  { path: 'product/mobile', component: Mobile},
  { path: 'product/syspro', component: Syspro },
  { path: 'product/fis', component: Fis},
  { path: 'product/his', component: His },
  { path: 'product/humidefi', component: Humidefi }
];
