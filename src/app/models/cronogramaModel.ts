export class CronogramaModel {
  public id: number;
  public valorNominal: number;
  public valorComercial: number;
  public moneda: string;
  public frecuenciaDias: number;
  public inflacion:number;
  public plazo: number;
  public tipo_tasa_cupon: string;
  public capitalizacion: number;
  public tasa_interes_cupon: number;
  public tasa_interes_mercado: number;
  public fecha_emision:string;
  public impuestoRenta: number;
  public prima: number;
  public flujo:number;
}
