import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/rest.service';

import { AccountType, Grade, Employee } from 'src/app/models'

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  submitted = false;
  employee: Employee;
  grades: Grade[] = [];
  types: AccountType[] = [];

  employeeForm = this.fb.group({
    employeeId: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    name: ['', [Validators.required]],
    grade: ['0', [Validators.required]],
    address : ['', [Validators.required]],
    mobileNumber: ['', [Validators.required]],
    bank: this.fb.group({
      bankName: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      accountType: ['0', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      currentBalance: ['', [Validators.required]],
    }),
  });

  constructor(private fb: FormBuilder, private service: RestService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getGrades();
    this.getTypes();
  }


  getGrades(){
    this.service.getGradeList().subscribe(data => {
      this.grades = data;
    });
  }

  
  getTypes(){
    this.service.getTypeList().subscribe(data => {
      this.types = data;
    });
  }

  get f() { return this.employeeForm.controls; }

  get g(){return (this.employeeForm.get('bank') as FormGroup).controls; }

  onSubmit() {
    if(!this.employeeForm.valid){
      return;
    }
    let vals = this.employeeForm.value;
    this.employee = {
      employee_id : vals.employeeId,
      name: vals.name,
      address: vals.address,
      mobile_number: vals.mobileNumber,
      grade: {
        id: vals.grade
      },
      bank_account : {
        account_name: vals.bank.accountName,
        account_number: vals.bank.accountNumber,
        account_type: {
          id: vals.bank.accountType
        },
        bank_name: vals.bank.bankName,
        branch_name: vals.bank.branchName,
        current_banlance: vals.bank.currentBalance,
        status: 0
      }
    }

    this.service.insertEmployee(this.employee).subscribe(data=> {
      console.log(data);
      this.showMessage("Successfully Created", true);
      this.router.navigate(['employee']);
    },
    err=> {
      console.log(err); 
      this.showMessage("employee id already exist!", false);
    });
  }

  showMessage(message: String, isSuccess: boolean) {
    isSuccess ? 
    this.toastr.success(`${message}`): this.toastr.error(`${message}`);
  }
}
