import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { TransferInterface } from './model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public transfers: TransferInterface[] = [];
  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.transfers = this.historyService.getData();
  }
}
