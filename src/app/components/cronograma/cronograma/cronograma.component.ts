import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {StorageService} from '../../../services/storage.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import {ResultadosFinalesModel} from '../../../models/resultadosFinales';
import {ResultadoFinalService} from '../../../services/resultado-final.service';



@Component({
  selector: 'app-booking',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})

export class CronogramaComponent implements OnInit {

   public dataSource: MatTableDataSource<ResultadosFinalesModel>;


  displayedColumns: string[] = ['id', 'valorNominal', 'valorIndexado', 'tep' , 'cupon', 'inflacion' , 'amortizacion' , 'cuota', 'flujo', 'prima', 'escudo', 'flujoEmisorEscudo', 'flujoBonista', 'flujoAct', 'faxplazo', 'factorpConvexidad' , 'userId'];
  @ViewChild(MatSort) sort: MatSort;
  constructor( public resultadoService: ResultadoFinalService, private storageService: StorageService) { }
  ngOnInit(): void {
    this.getData();
    this.dataSource = new MatTableDataSource<any>();
  }
  getData(): void{
    // tslint:disable-next-line:radix
  this.resultadoService.getResultadosByUserId(this.storageService.getCurrentUser().id).subscribe((res) => {
    this.dataSource.data = res;
    });
  }

  onNoClick(): void{

  }

  resetear(): void {
    this.resultadoService.getResultadosByUserId(this.storageService.getCurrentUser().id).subscribe((res) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < res.length; ++i){
        // tslint:disable-next-line:no-shadowed-variable
        this.resultadoService.deleteResultadosById( res[i].id).subscribe((res) => {
          console.log('La información: ', res, ' ha sido eliminada.');
        }, (error => {
          console.log('el error es: ', error);
        }));
      }
    });
    alert('Data has been deleted');
  }
}
