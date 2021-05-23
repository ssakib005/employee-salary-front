export interface Employee{
    id?: number;
    employee_id?: number;
    name?: String;
    grade?: Grade;
    address?: String;
    mobile_number?: String;
    bank_account?: EmployeeAccount;
}

export interface Grade{
    id?: number;
    grade_name?: String;
}

export interface EmployeeAccount{
    id?: number;
    account_type?: AccountType;
    account_name?: String;
    account_number?: String;
    bank_name?:String;
    branch_name?:String;
    current_banlance?:number;
    status?: number;
}

export interface AccountType{
    id?: number;
    account_type?: String;
}

export interface TransferResponse{
    message?: String;
    responseCode?: number;
}

export interface TranHistory{
    totalPaidSalary?: number;
    remainingBalance?: number;
}