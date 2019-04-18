import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

import { UserServiceProvider } from '../../../../providers/user-service/user-service'

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      nsr: {
        title: 'NSR',
        type: 'number',
      },
      pis: {
        title: 'PIS',
        type: 'number',
      },
      tipo: {
        title: 'Type Registre',
        type: 'number',
      },
      created_at: {
        title: 'Date Time',
        type: 'date',
      },
      updated_at: {
        title: 'Update',
        type: 'date',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private userServiceProvider2: UserServiceProvider) {
      this.userServiceProvider2.registrosPonto().then((response) => {
          this.source.load(response['data']);
        }
      );
      //const data = this.service.getData();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onRegister(): void {
    this.userServiceProvider2.pontoRegister().then((response) => {
      console.log(response['data']);
    }
  );
  }
}
