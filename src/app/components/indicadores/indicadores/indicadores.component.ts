import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ResultadosFinalesModel} from '../../../models/resultadosFinales';
import {IndicadoresServices} from '../../../services/indicadores.service';
import {StorageService} from '../../../services/storage.service';
import {IndicadoresModel} from '../../../models/indicadores.model';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  public dataSource: MatTableDataSource<IndicadoresModel>;
  displayedColumns: string[] = ['id', 'vna', 'utilidad', 'duracion' , 'convexidad', 'total' , 'duracionMod', 'tir' , 'tceaEmisor'];
  constructor(public indicadorService: IndicadoresServices, public storageService: StorageService) { }

  ngOnInit(): void {
    this.getData();
    this.dataSource = new MatTableDataSource<IndicadoresModel>();
  }
  getData(): void{
    this.indicadorService.getIndicadoresById(this.storageService.getCurrentUser().id).subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  resetear(): void{
    this.indicadorService.getIndicadoresById(1).subscribe((res)=>{
      for(let i=0;i<res.length;++i){
        this.indicadorService.deleteIndicadorById(res[i].id).subscribe((res) => {
          console.log('La informacion: ', res , 'ha sido eliminada');
        });
      }
    });
    alert('Data has been deleted');
  }
}
