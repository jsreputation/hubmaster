import { Pipe, PipeTransform } from '@angular/core';
import { ContractStatus } from '../../core/models/contract';

@Pipe({
  name: 'contractBtnLabel'
})
export class ContractBtnLabelPipe implements PipeTransform {

  transform(status: ContractStatus): string {
    switch (status) {
      case ContractStatus.Pending:
        return 'Request Project Contract';
      case ContractStatus.Requested:
        return 'Contract Requested';
      case ContractStatus.Ready:
        return 'Review Project Contract';
      case ContractStatus.Accepted:
        return 'View Project Contract';
    }
  }

}
