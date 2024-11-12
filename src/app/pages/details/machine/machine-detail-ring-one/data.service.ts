import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataFiller = {
    data: [
      {
        server: '10.10.2.111',
        data_base: 'aio_iot',
        table_name: '79_monitoring_proses_produksi_filling',
        field: 'Flow M741',
        timing: 'ontime',
        standar: '27.45 ~ 37.45 mL/min',
        result: '28 mL/min',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Frequency Pump F741',
        timing: 'ontime',
        standar: '38 Hz - 44 Hz',
        result: '40 Hz',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'LN2 Level',
        timing: 'ontime',
        standar: '1.5 - 2.5 mm',
        result: '2 mm',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'LN2 Pressure',
        timing: 'ontime',
        standar: '0.10 - 0.40 Mpa',
        result: '0.20 Mpa',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Opening Valve LN2',
        timing: 'ontime',
        standar: '05-Dec',
        result: '05-Dec',
      },
    ],
  };

  private dataBlow = {
    data: [
      {
        server: '10.10.2.111',
        data_base: 'aio_iot',
        table_name: '76_pemeriksaan_proses__area_blow',
        field: 'Flow Chiller at Oven',
        timing: 'ontime',
        standar: '1-2 m3/h',
        result: '1 m3/h',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Temperature',
        timing: 'ontime',
        standar: '20 ~ 30 C',
        result: '25 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Incoming Air Pressure',
        timing: 'ontime',
        standar: '23 ~ 40 bar',
        result: '25 bar',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'PF Dust Removal Pressure',
        timing: 'ontime',
        standar: '0.5 ~ 1.5 Bar',
        result: '1 Bar',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Streching Pressure',
        timing: 'ontime',
        standar: '5.5 ~ 9 Bar',
        result: '6 Bar',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Actuating Pressure',
        timing: 'ontime',
        standar: '5.5 ~ 9 Bar',
        result: '7 Bar',
      },
    ],
  };

  private dataInjection = {
    data: [
      {
        server: '10.10.2.111',
        data_base: 'aio_iot',
        table_name: '66_pengecekan_mesin_injeksi_',
        field: 'Machine Heats - Fareast',
        timing: 'ontime',
        standar: '286-230 C',
        result: '230 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Machine Heats - High Alarm',
        timing: 'ontime',
        standar: '320 C',
        result: '320 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Machine Heats - High Dev Alarm',
        timing: 'ontime',
        standar: '30 C',
        result: '30 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Machine Heats - Low Dev Alarm',
        timing: 'ontime',
        standar: '30 C',
        result: '30 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Machine Heats - Low Alarm',
        timing: 'ontime',
        standar: '260 C',
        result: '260 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Machine Heats - Resin Temperature',
        timing: 'ontime',
        standar: '> 140 C',
        result: '150 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Mold Heats',
        timing: 'ontime',
        standar: '280 - 290 C',
        result: '285 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Mold Heats - High Alarm',
        timing: 'ontime',
        standar: '320 C',
        result: '320 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Mold Heats - High Dev. Alarm',
        timing: 'ontime',
        standar: '30 C',
        result: '30 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Mold Heats - Low Dev. Alarm',
        timing: 'ontime',
        standar: '30 C',
        result: '30 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Mold Heats - Low Alarm',
        timing: 'ontime',
        standar: '260 C',
        result: '260 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Mold Heats - Oil Temperature',
        timing: 'ontime',
        standar: '< 55 C',
        result: '40 C',
      },
    ],
  };

  private dataCaser = {
    data: [
      {
        server: '10.10.2.111',
        data_base: 'aio_iot',
        table_name: '94_inspeksi_produksi_area_caser',
        field: 'Inlet Air Pressure',
        timing: 'ontime',
        standar: '2 - 4 bar',
        result: '3 Bar',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Temperature Tank Set',
        timing: 'ontime',
        standar: '130 - 180 C',
        result: '135 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Temperature Hoze Set',
        timing: 'ontime',
        standar: '130 - 180 C',
        result: '150 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Temperature Nozzle',
        timing: 'ontime',
        standar: '130 - 180 C',
        result: '180 C',
      },
    ],
  };
  private dataPacking = {
    data: [
      {
        server: '10.10.2.111',
        data_base: 'aio_iot',
        table_name: '109_persiapan_proses_produksi',
        field: 'Camera Rejector Fresco',
        timing: 'ontime',
        standar: 'Verifikasi',
        result: 'Verifikasi',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Mesin Label',
        timing: 'ontime',
        standar: 'Verifikasi',
        result: 'Verifikasi',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Cap Closure',
        timing: 'ontime',
        standar: 'Verifikasi',
        result: 'Verifikasi',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Capping angle',
        timing: 'ontime',
        standar: 'Verifikasi',
        result: 'Verifikasi',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'inspkestor camera CDL',
        timing: 'ontime',
        standar: 'Verifikasi',
        result: 'Verifikasi',
      },
    ],
  };

  private dataPreparation = {
    data: [
      {
        server: '10.10.2.111',
        data_base: 'aio_iot',
        table_name: '52_pemeriksaan_proses_ilb_filler_',
        field: 'Brix Pocari solution (%)',
        timing: 'ontime',
        standar: 'PS:5.96% - 6.36% | IW:3.63% - 4.03%',
        result: 'PS:5.96% - 6.36% | IW:3.63% - 4.03%',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Delta Press. Before After Fi213',
        timing: 'ontime',
        standar: '0~0.05 MPa',
        result: '0 Mpa',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Temperature Outlet Solution',
        timing: 'ontime',
        standar: '100 ~ 110 C',
        result: '100 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Flow Solution CCP1',
        timing: 'ontime',
        standar: '14886 - 22329 L/H',
        result: '14886 H',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Temperature Outlet Solution',
        timing: 'ontime',
        standar: '108 C - 112 C',
        result: '110 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Temperature Outlet Solution',
        timing: 'ontime',
        standar: '19 C - 25 C',
        result: '20 C',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Pressure Inlet Chilled Water',
        timing: 'ontime',
        standar: '0.10 - 0.30 MPa',
        result: '0.20 Mpa',
      },
      {
        server: null,
        data_base: null,
        table_name: null,
        field: 'Pressure Aseptic Tank',
        timing: 'ontime',
        standar: '0.204 - 0.215 MPa',
        result: '0.210 Mpa',
      },
    ],
  };
  constructor() {}

  getDataPreparation() {
    return this.dataPreparation;
  }

  getDataBlow() {
    return this.dataBlow;
  }

  getDataInjection() {
    return this.dataInjection;
  }

  getDataCaser() {
    return this.dataCaser;
  }
  getDataPacking() {
    return this.dataPacking;
  }

  getDataFiller() {
    return this.dataFiller;
  }
}
