import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit,OnChanges, AfterViewInit {
  // listFilter:string;
  hitMessage:string;
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @Output() valueChange: EventEmitter<string>= new EventEmitter<string>();
  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }
  private _listFilter:string;
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter=value;
    this.valueChange.emit(value);
  }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges):void{
    if(changes['hitCount'] && !changes['hitCount'].currentValue){
      this.hitMessage='No matches found';
    }
    else{
      this.hitMessage='Hits: ' + this.hitCount;
    }
  }

  ngAfterViewInit(){
    if(this.filterElementRef){
        this.filterElementRef.nativeElement.focus();
    }
}

}
