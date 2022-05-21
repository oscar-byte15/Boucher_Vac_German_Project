import { Component, OnInit } from '@angular/core';
import {PublicationService} from '../../services/publication.service';
import {StorageService} from '../../services/storage.service';
import {UserProfilePublicationComponent} from './UserProfileByPublication/user-profile-publication/user-profile-publication.component';
import {MatDialog} from '@angular/material/dialog';

import {FormBuilder, FormControl, Validators} from '@angular/forms';

import {CronogramaModel} from '../../models/cronogramaModel';
import {CronogramaComponent} from '../cronograma/cronograma/cronograma.component';

import {ResultadoFinalService} from '../../services/resultado-final.service';
import {ResultadosFinalesModel} from '../../models/resultadosFinales';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  BonoForm: any;
  date: any;
  currentUser: any;
  roomsFilter: any;
  public cronograma_model: CronogramaModel = new CronogramaModel();
  public resultadosFinalesModel: ResultadosFinalesModel = new ResultadosFinalesModel();
  public resultadosFinalesModel2: ResultadosFinalesModel = new ResultadosFinalesModel();
  constructor(private apiPublicationService: PublicationService, private storageService: StorageService,
              private dialog: MatDialog, private formBuilder: FormBuilder, public resultadoService: ResultadoFinalService) {
  }

  ngOnInit(): void {

    this.currentUser = this.storageService.getCurrentUser().id;
    this.BonoForm = this.formBuilder.group({
    bono: ['', Validators.required],
      dias: ['', Validators.required],
      anios: ['', Validators.required],
      capitalizacion: ['', Validators.required],
      tasa_interes: ['', Validators.required],
      fecha_emision: ['', Validators.required],
      cok: ['', Validators.required],
    });

  }

  calcular_cronograma(moneda, tipo_tasa): void{
    console.log('datos en el consola: ', moneda, tipo_tasa, this.cronograma_model.bono );
    this.cronograma_model.id = 1;
    this.cronograma_model.bono = this.BonoForm.value.bono;
    this.cronograma_model.moneda = moneda;
    this.cronograma_model.dias = this.BonoForm.value.dias;
    this.cronograma_model.anios = this.BonoForm.value.anios;
    this.cronograma_model.tipo_tasa = tipo_tasa;
    this.cronograma_model.capitalizacion = this.BonoForm.value.capitalizacion;
    this.cronograma_model.tasa_interes = this.BonoForm.value.tasa_interes;
    this.cronograma_model.fecha_emision = this.BonoForm.value.fecha_emision;
    this.cronograma_model.cok = this.BonoForm.value.cok;

    // const arrayData: Array<ResultadosFinales> = [];
    let TEP: number;
    let counter = 1;
    const n_cuotas = (360 /  this.cronograma_model.dias) * this.cronograma_model.anios;
    if (this.cronograma_model.tipo_tasa === 'nominal'){
      const m: number = (360 / this.cronograma_model.capitalizacion);
      const n: number = (360 / this.cronograma_model.capitalizacion);
      const TNA: number = (this.cronograma_model.tasa_interes / 100);
      const i: number = (1 + TNA) / m;
      const TEA = Math.pow(i, n) - 1;
      TEP = Math.pow((1 + TEA), this.cronograma_model.dias / 360) - 1;
      console.log('La tasa efectiva en un periodo es: ', TEP);
    }
    if (this.cronograma_model.tipo_tasa === 'efectiva'){
      const TEA: number = this.cronograma_model.tasa_interes / 100;
      const v1: number = (1 + TEA);
      const v2: number = this.cronograma_model.dias / 360;
      TEP = Math.pow( v1, v2) - 1 ;
      console.log('el TEP es:  ', TEP);
      console.log('1+TEA es : ', (1 + TEA));
      console.log('La division de frecuencia y 360 es : ', this.cronograma_model.dias / 360 );
    }
    let saldoInicial: number =  this.cronograma_model.bono;
    let interes: number = TEP * saldoInicial;
    let amortizacion: number = saldoInicial / (n_cuotas - counter + 1);
    let cuota: number = interes + amortizacion ;
    let saldoFinal: number = saldoInicial - amortizacion;

    this.resultadosFinalesModel2.numero = counter;
    this.resultadosFinalesModel2.saldoInicial = saldoInicial;
    this.resultadosFinalesModel2.interes = interes;
    this.resultadosFinalesModel2.cuota = cuota;
    this.resultadosFinalesModel2.amortizacion = amortizacion;
    this.resultadosFinalesModel2.saldoFinal = saldoFinal;
    this.resultadosFinalesModel2.userId = this.currentUser;
    // invocar al servicio de post recuerdaaaaaaaaaaa

    this.resultadoService.postResultados(this.resultadosFinalesModel2).subscribe((res) =>{
      console.log('La informacion en el servicio de post resultados es: ', res);
    });

    for ( counter = 2; counter <= n_cuotas; counter++){

      if (counter >= 2){
        saldoInicial = saldoFinal;
        interes = TEP * saldoInicial;
        amortizacion = saldoInicial / (n_cuotas - counter + 1);
        cuota = interes + amortizacion;
        saldoFinal = saldoInicial - amortizacion;

        this.resultadosFinalesModel.numero = counter;
        this.resultadosFinalesModel.saldoInicial = saldoInicial;
        this.resultadosFinalesModel.interes = interes;
        this.resultadosFinalesModel.cuota = cuota;
        this.resultadosFinalesModel.amortizacion = amortizacion;
        this.resultadosFinalesModel.saldoFinal = saldoFinal;
        this.resultadosFinalesModel.userId = this.currentUser;
        // invocar al servicio de post recuerdaaaaaaaaaaa

        this.resultadoService.postResultados(this.resultadosFinalesModel).subscribe((res) =>{
          console.log("La informacion en el servicio de post resultados es: ", res);
        });
      }
    }


    const dialogRef = this.dialog.open(CronogramaComponent, {
      width: '1550px',
      height: '950px',
      data: {
        id: this.cronograma_model.id,
        bono: this.cronograma_model.bono,
        moneda: this.cronograma_model.moneda,
        frecuencia_dias: this.cronograma_model.dias,
        tiempo_anios: this.cronograma_model.anios,
        tipo_tasa: this.cronograma_model.tipo_tasa,
        capitalizacion: this.cronograma_model.capitalizacion,
        tasa_interes: this.cronograma_model.tasa_interes,
        fecha_emision:  this.cronograma_model.fecha_emision,
        cok: this.cronograma_model.cok
      }
    });
  }
  ver_indicadores(): void{

  }
  // tslint:disable-next-line:variable-name

  seeUserProfile(user_id: number): void{
    console.log('The user id is: ' + user_id);
    const dialogRef = this.dialog.open(UserProfilePublicationComponent, {
      width: '1550px',
      height: '950px',
      data:  user_id,
    });

  }



}
