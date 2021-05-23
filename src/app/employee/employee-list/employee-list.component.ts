import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee, TranHistory } from 'src/app/models';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: RestService, private toastr: ToastrService ) { }

  employeeList: Employee[];
  history: TranHistory;

  totalPaid: number;
  totalBalance: number;

  ngOnInit(): void {
   this.init();
  }

  init(){
    this.getEmployess()
    this.getHistory();
  }

  getEmployess(){
    this.service.getEmployeeList().subscribe(data => {
      console.log(data);
      this.employeeList = data;
    });
  }

  getHistory(){
    this.service.getCompanyTranHistory().subscribe(data => {
      this.totalPaid = data.totalPaidSalary;
      this.totalBalance = data.remainingBalance;
      this.history = data;
    });
  }

  transferalary(id: number){
    this.service.transferSalary(id).subscribe(data => {
      this.init();
      if(data.responseCode == 1002){
        this.showMessage(data.message, false);
      }else{
        this.showMessage(data.message, true);
      }
    });
  }

  pay(){
    this.service.transferSalaryToAll().subscribe(data=> {
      this.init();
      if(data.responseCode == 1002){
        this.showMessage(data.message, false);
      }else{
        this.showMessage(data.message, true);
      }
    });
  }

  showMessage(message: String, isSuccess: boolean) {
    isSuccess ? 
    this.toastr.success(`${message}`): this.toastr.error(`${message}`);
  }

}
