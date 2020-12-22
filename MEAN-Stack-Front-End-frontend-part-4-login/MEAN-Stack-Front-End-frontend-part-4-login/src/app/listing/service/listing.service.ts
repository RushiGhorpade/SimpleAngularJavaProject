import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Listing } from "../model/listing";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ListingService {
  private ROOT_URL = "http://localhost:8080/getall";
  private ROOT_URL1 = "http://localhost:8080";

  private httpOptions = {
    
    headers: new HttpHeaders()
    .set("Content-Type","application/json")
    .set("auth-token",localStorage.getItem("token"))   
  };




  constructor(private http: HttpClient,
    private  router:Router) {}   

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.ROOT_URL,this.httpOptions);
}

  getListing(id: string) {
    return this.http.get<Listing>(`${this.ROOT_URL}/${id}`,this.httpOptions);
  }
  editListing(listing, id: string){
      return this.http.put<any>(`${this.ROOT_URL1}/update/${id}`,listing,this.httpOptions);
  }

  addListing(listing) {
    return this.http.post<any>(this.ROOT_URL, listing, this.httpOptions);
  }

  deleteListing(id: string) {
    return this.http.delete(`${this.ROOT_URL1}/delete/${id}`, this.httpOptions);
  }


  


}


