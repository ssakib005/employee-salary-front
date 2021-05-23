import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  constructor(private service: RestService) { }

  balance: number;
  salary: number;

  bal;
  sal;

  isBalance = false;
  isSalary = false;

  ngOnInit(): void {
    this.getCompanyBalance();
    this.getLowestGradeAmount();
  }

  getCompanyBalance(){
    this.service.getCompanyBalance().subscribe(data => {
      this.balance = data;
    });
  }

  addBalance(){
    this.isBalance = true;
    console.log(this.isBalance);
  }

  addSalary(){
    this.isSalary = true;
  }

  updateBalance(params: number){
    console.log(params);
    if(params){
      this.service.setCompanyBalance(params).subscribe(data=> {
        console.log(data);
        this.balance = data;
        this.bal = "";
      this.isBalance = false;
      });
    }else{
      this.isBalance = false;
    }
  }

  updateSalary(params: number){
    console.log(params);
    if(params){
      this.service.setBasicSalary(params).subscribe(data=> {
        console.log(data);
        this.salary = data;
        this.sal = "";
      this.isSalary = false;
      });
    }else{
      this.isSalary = false;
    }
  }

  getLowestGradeAmount(){
    this.service.getBasicSalary().subscribe(data => {
      this.salary = data;
    });
  }
}
