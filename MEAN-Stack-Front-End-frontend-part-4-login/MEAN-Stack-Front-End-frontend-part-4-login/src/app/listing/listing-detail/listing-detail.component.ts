import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListingService } from "../service/listing.service";
import { ActivatedRoute  } from "@angular/router";
import { Listing } from "../model/listing";
import { Subscription } from "rxjs";
import { ThrowStmt } from "@angular/compiler";
import { FormGroup ,Validators,FormControl} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-listing-detail",
  templateUrl: "./listing-detail.component.html",
  styleUrls: ["./listing-detail.component.scss"]
})
export class ListingDetailComponent implements OnInit, OnDestroy {
  id: string;

  listing: Listing;

  listingSub$: Subscription;

  showForm : boolean;

  editListingForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    file: new FormControl("", [Validators.required])
    });
  

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private  router:Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.listingSub$ = this.listingService
      .getListing(this.id)
      .subscribe(listing => {
        this.listing = listing;
      });
  }

  ngOnDestroy(): void {
    this.listingSub$.unsubscribe();
  }

  showEdit()
  {
    this.showForm = !this.showForm
  }

 
  


  editListing()
  {
    let file = (<HTMLInputElement>document.getElementById('myfileinput')).files[0];
     let base64;
     console.log(file)
      debugger;
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
         console.log(reader.result);
     
           base64 = reader.result;
     

    alert(base64)

    this.editListingForm.value.file = base64;

    this.id = this.route.snapshot.paramMap.get("id");
    if(this.editListingForm.valid){

      this.listingService.editListing(this.editListingForm.value,this.id).subscribe(res  =>{
        this.editListingForm.reset();
        this.router.navigate(["/listings"])
      })
    }
  }


}

removeListing() {
  this.id = this.route.snapshot.paramMap.get("id");
  this.listingService.deleteListing(this.id).subscribe(res => {
    console.log(res);
    this.router.navigate(["/listings"]);
  });
}
  
}
