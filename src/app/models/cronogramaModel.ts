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
  public fecha_emision:string;
  public flujo:number;
}
