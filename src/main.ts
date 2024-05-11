import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/modulos/usuarios/AppModule';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
