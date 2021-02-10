import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history/history.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { luhnValidator } from './validation/luhnValidator';
import { getValidationConfigFromCardNo } from './validation/card.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  cardNumberGroup!: FormGroup;
  constructor(private historyService: HistoryService, private router: Router) { }
  
  ngOnInit(): void {
    this.cardNumberGroup = new FormGroup({
        'firstName': new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]),
        'lastName': new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]),
        'cardNumberFrom': new FormControl('', [
          Validators.required,
          Validators.minLength(12),
          luhnValidator()
        ]),
        'value': new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\d]+$/)
        ]),
        'cardNumberTo': new FormControl('', [
          Validators.required,
          Validators.minLength(12),
          luhnValidator()
        ]),
        'time': new FormControl('', [
        ]),
    })
  }
  transfer() {
    this.cardNumberGroup.get('time')?.setValue(new Date().toISOString());
    this.historyService.setData(this.cardNumberGroup.value);
    this.goToHistory();
  }
  
  cardMaskFunction(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }
  
  goToHistory() {
    this.router.navigate(['history']);
  }
}
