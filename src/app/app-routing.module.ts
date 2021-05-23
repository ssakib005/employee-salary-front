import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfoComponent } from './company/company-info/company-info.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

const routes: Routes = [
  {path: "",  component: CompanyInfoComponent},
  {path: "company",  component: CompanyInfoComponent},
  {path: "employee",  component: EmployeeListComponent},
  {path: "employee-create",  component: EmployeeFormComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
