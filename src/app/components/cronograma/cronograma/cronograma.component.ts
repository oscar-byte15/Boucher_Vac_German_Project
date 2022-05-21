import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../../../services/booking.service';
import {StorageService} from '../../../services/storage.service';
import {BookingModel} from '../../../models/booking.model';
import {B} from '@angular/cdk/keycodes';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ResultadosFinalesModel} from '../../../models/resultadosFinales';
import {ResultadoFinalService} from '../../../services/resultado-final.service';



@Component({
  selector: 'app-booking',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})

export class CronogramaComponent implements OnInit {

   public dataSource: MatTableDataSource<ResultadosFinalesModel>;


  displayedColumns: string[] = ['id', 'numero', 'saldoInicial', 'interes', 'cuota', 'amortizacion', 'saldoFinal','userId'];
  @ViewChild(MatSort) sort: MatSort;
  constructor( public resultadoService: ResultadoFinalService, private storageService: StorageService) { }
  ngOnInit(): void {
    this.getData();
    this.dataSource = new MatTableDataSource<any>();
  }
  getData(): void{
  this.resultadoService.getResultadosByUserId(this.storageService.getCurrentUser().id).subscribe((res) => {
    console.log('El arreglo de informacion del flujo de datos es : ', res);
    // recuerda revisar el service nombreModel[]
    this.dataSource.data = res;
    });
  }

  onNoClick(): void{

  }

  resetear():void {
    this.resultadoService.deleteResultadosByUserId(this.storageService.getCurrentUser().id).subscribe((res)=>{
      console.log("La información: ",res, " ha sido eliminada.");
    });
  }
}
