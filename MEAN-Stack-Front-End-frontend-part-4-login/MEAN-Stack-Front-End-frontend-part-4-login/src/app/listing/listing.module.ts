import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { AllListingComponent } from './all-listing/all-listing.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ReactiveFormsModule } from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { WelcomeComponent } from './welcome/welcome.component'



@NgModule({
  declarations: [AllListingComponent, ListingDetailComponent, WelcomeComponent],
  imports: [
    CommonModule,
    ListingRoutingModule,
    ReactiveFormsModule,
    MatButtonModule
    
  ]
})
export class ListingModule { }
