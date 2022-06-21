import { Component, OnInit } from '@angular/core';

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
  constructor( private storageService: StorageService,
               private dialog: MatDialog, private formBuilder: FormBuilder, public resultadoService: ResultadoFinalService) {
  }

  ngOnInit(): void {

    this.currentUser = this.storageService.getCurrentUser().id;
    this.BonoForm = this.formBuilder.group({
      valor_nominal: ['', Validators.required],
      valor_comercial: ['', Validators.required],
      dias: ['', Validators.required],
      anios: ['', Validators.required],
      capitalizacion: ['', Validators.required],
      inflacion: ['', Validators.required],
      tasa_interes_cupon: ['', Validators.required],
      fecha_emision: ['', Validators.required],
      prima: ['', Validators.required],
      cavali: ['', Validators.required],
      flotacion: ['', Validators.required],
      tasa_interes_mercado: ['', Validators.required]
    });

  }

  calcular_cronograma(moneda, tipo_tasa_cupon): void{
    console.log('datos en el consola: ', moneda, tipo_tasa_cupon, this.cronograma_model.valorNominal );
    this.cronograma_model.id = 1;
    this.cronograma_model.valorNominal = this.BonoForm.value.valor_nominal;
    this.cronograma_model.valorComercial = this.BonoForm.value.valor_comercial;
    this.cronograma_model.moneda = moneda;
    this.cronograma_model.frecuenciaDias = this.BonoForm.value.dias;
    this.cronograma_model.plazo = this.BonoForm.value.anios;
    this.cronograma_model.inflacion = this.BonoForm.value.inflacion;
    this.cronograma_model.tipo_tasa_cupon = tipo_tasa_cupon;
    this.cronograma_model.tasa_interes_cupon = this.BonoForm.value.tasa_interes_cupon;

    this.cronograma_model.capitalizacion = this.BonoForm.value.capitalizacion;

    this.cronograma_model.fecha_emision = this.BonoForm.value.fecha_emision;

    // const arrayData: Array<ResultadosFinales> = [];
    let TEP: number;
    let TEInflacion: number;
    let counter = 1;
    const n_cuotas = (360 /  this.cronograma_model.frecuenciaDias) * this.cronograma_model.plazo;
    if (this.cronograma_model.tipo_tasa_cupon === 'nominal'){
      const m: number = (360 / this.cronograma_model.capitalizacion);
      const n: number = (360 / this.cronograma_model.capitalizacion);
      const TNA: number = (this.cronograma_model.tasa_interes_cupon / 100);
      const i: number = (1 + TNA) / m;
      const TEA = Math.pow(i, n) - 1;
      TEP = Math.pow((1 + TEA), this.cronograma_model.frecuenciaDias / 360) - 1;
      console.log('La tasa efectiva en un periodo es: ', TEP);
    }
    if (this.cronograma_model.tipo_tasa_cupon === 'efectiva'){
      const TEA: number = this.cronograma_model.tasa_interes_cupon / 100;
      const TInflacion: number = this.cronograma_model.inflacion / 100;
      const v1: number = (1 + TEA);
      const v2: number = this.cronograma_model.frecuenciaDias / 360;

      const v1Infla: number = (1 + TInflacion);
      const v2Infla: number = this.cronograma_model.frecuenciaDias / 360;

      TEP = Math.pow( v1, v2) - 1 ;
      TEInflacion = Math.pow(v1Infla, v2Infla) - 1;
      console.log('el TEP es:  ', TEP);
      console.log('1+TEA es : ', (1 + TEA));
      console.log('La division de frecuencia y 360 es : ', this.cronograma_model.frecuenciaDias / 360 );
    }
    let valorNominal: number =  this.cronograma_model.valorNominal;
    let valorIndexado: number = valorNominal * (1 + TEInflacion);
    let cupon: number = (TEP * valorIndexado);
    let amortizacion: number = valorIndexado / (n_cuotas - counter + 1);
    let cuota: number = cupon + amortizacion ;
    let flujo: number = cupon + amortizacion;
    this.resultadosFinalesModel2.numero = counter;
    this.resultadosFinalesModel2.valorNominal = Number(valorNominal.toFixed(3));
    this.resultadosFinalesModel2.valorIndexado = Number(valorIndexado.toFixed(3));
    this.resultadosFinalesModel2.tep = Number(TEP.toFixed(3)) * 100;
    this.resultadosFinalesModel2.cupon = Number(cupon.toFixed(3));
    this.resultadosFinalesModel2.inflacion = Number(TEInflacion.toFixed(3));
    this.resultadosFinalesModel2.amortizacion = Number(amortizacion.toFixed(3));
    this.resultadosFinalesModel2.cuota = Number(cuota.toFixed(3));
    this.resultadosFinalesModel2.flujo = Number(flujo.toFixed(3));
    this.resultadosFinalesModel2.userId = this.currentUser;

    if (this.resultadosFinalesModel2.valorNominal > 0) {
    this.resultadoService.postResultados(this.resultadosFinalesModel2).subscribe((res) => {
      console.log('La informacion en el servicio de post resultados es: ', res);
    });
  }
    for ( counter = 2; counter <= n_cuotas; counter++){

      if (counter >= 2) {
        valorNominal = valorIndexado - amortizacion;
        valorIndexado = valorNominal * (1 + TEInflacion);
        cupon = TEP * valorIndexado;
        amortizacion = valorIndexado / (n_cuotas - counter + 1);
        cuota = cupon + amortizacion;
        flujo = cuota;

        this.resultadosFinalesModel.numero = counter;
        this.resultadosFinalesModel.valorNominal = Number(valorNominal.toFixed(3));
        this.resultadosFinalesModel.valorIndexado = Number(valorIndexado.toFixed(3));
        this.resultadosFinalesModel.tep = Number(TEP.toFixed(3)) * 100;
        this.resultadosFinalesModel.cupon = Number(cupon.toFixed(3));
        this.resultadosFinalesModel.inflacion = Number(TEInflacion.toFixed(3)) * 100;
        this.resultadosFinalesModel.amortizacion = Number(amortizacion.toFixed(3));
        this.resultadosFinalesModel.cuota = Number(cuota.toFixed(3));
        this.resultadosFinalesModel.flujo = Number(flujo.toFixed(3));

        this.resultadosFinalesModel.userId = this.currentUser;
        // tslint:disable-next-line:triple-equals
        if (counter == n_cuotas){
          flujo = cuota + ((this.BonoForm.value.prima / 100 ) * valorIndexado);
          this.resultadosFinalesModel.flujo = Number(flujo.toFixed(3));
        }
        if (this.resultadosFinalesModel.valorNominal > 0) {
          this.resultadoService.postResultados(this.resultadosFinalesModel).subscribe((res) => {
            console.log('La informacion en el servicio de post resultados es: ', res);
          });
        }
      }
    }


    const dialogRef = this.dialog.open(CronogramaComponent, {
      width: '1550px',
      height: '950px',
      data: {
        id: this.cronograma_model.id,
        bono: this.cronograma_model.valorNominal,
        moneda: this.cronograma_model.moneda,
        frecuencia_dias: this.cronograma_model.frecuenciaDias,
        tiempo_anios: this.cronograma_model.plazo,
        tipo_tasa: this.cronograma_model.tipo_tasa_cupon,
        capitalizacion: this.cronograma_model.capitalizacion,
        tasa_interes: this.cronograma_model.tasa_interes_cupon,
        fecha_emision:  this.cronograma_model.fecha_emision
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
