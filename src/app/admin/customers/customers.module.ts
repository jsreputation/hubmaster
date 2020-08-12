import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserTableModule } from '../../ui-kit/table/user-table/user-table.module';
import { AvatarModule } from '../../ui-kit/avatar/avatar.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { InputModule } from '../../ui-kit/input/input.module';
import { ContractTableModule } from '../../ui-kit/table/contract-table/contract-table.module';
import { ProjectTableModule } from '../../ui-kit/table/project-table/project-table.module';
import { ContractModule } from '../../shared/contract/contract.module';

import { CustomersRoutingModule } from './customers-routing.module';

import { CustomersComponent } from './customers.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerProjectsComponent } from './customer-projects/customer-projects.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerContractsComponent } from './customer-contracts/customer-contracts.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerProfileComponent,
    CustomerProjectsComponent,
    CustomerAccountComponent,
    CustomerContractsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomersRoutingModule,
    UserTableModule,
    AvatarModule,
    PipesModule,
    InputModule,
    ProjectTableModule,
    ContractTableModule,
    ContractModule
  ]
})
export class CustomersModule { }
