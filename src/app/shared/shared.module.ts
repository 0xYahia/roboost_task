import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotfoundComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [HeaderComponent, FooterComponent, NotfoundComponent],
})
export class SharedModule {}
