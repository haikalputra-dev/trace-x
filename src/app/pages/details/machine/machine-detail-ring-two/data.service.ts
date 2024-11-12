import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataPreparation = {
    data: [
      {
        Utilitas: 'Chiller',
        Detail_Field: 'Temperatur',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '99_leaving_chiller_water_temp_chiller_turbo_cor_300tr',
        Std_per_Field: '8 -15 °C',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Flow, Pressure',
        Server_name: null,
        database_name: null,
        Table_Name: null,
        Std_per_Field: null,
        Timing_pengambilan_data: null,
      },
      {
        Utilitas: 'Cooling tower',
        Detail_Field: 'Pressure',
        Server_name: null,
        database_name: null,
        Table_Name: null,
        Std_per_Field: null,
        Timing_pengambilan_data: null,
      },
      {
        Utilitas: 'Air compres 8 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_prep_oc3',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_prep_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };

  private dataInjection = {
    data: [
      {
        Utilitas: 'Chiller',
        Detail_Field: 'Temperatur',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '93_leaving_chiller_water_temp_chiller_turbo_cor_125tr',
        Std_per_Field: '10 - 11 °C',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Flow, Pressure',
        Server_name: null,
        database_name: null,
        Table_Name: null,
        Std_per_Field: null,
        Timing_pengambilan_data: null,
      },
      {
        Utilitas: 'Cooling tower',
        Detail_Field: 'Pressure',
        Server_name: null,
        database_name: null,
        Table_Name: null,
        Std_per_Field: null,
        Timing_pengambilan_data: null,
      },
      {
        Utilitas: 'Air compres 8 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_injection_oc3',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_injetcion_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };

  private dataBlow = {
    data: [
      {
        Utilitas: 'Chiller',
        Detail_Field: 'Temperatur',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '100_temp_outlet_chiller_blow_oc3',
        Std_per_Field: '10 - 11 °C',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Flow',
        Server_name: null,
        database_name: null,
        Table_Name: null,
        Std_per_Field: null,
        Timing_pengambilan_data: null,
      },
      {
        Utilitas: null,
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '100_pressure_outlet_chiller_blow_oc3',
        Std_per_Field: '4 - 5Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Air compres 40 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '98_pressure_air_comp_before_filler_oc3',
        Std_per_Field: '30 - 35 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '98_flow_air_comp_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_blow_oc3',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_blow_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };

  private dataFiller = {
    data: [
      {
        Utilitas: 'Air compres',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_filler_oc3',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_filler_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };

  private dataLN2 = {
    data: [
      {
        Utilitas: 'Air compres 8 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_pp_prod_oc3',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_pp_prod_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };

  private dataCaper = {
    data: [
      {
        Utilitas: 'Air compres 8 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_pp_prod_oc3',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_pp_prod_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };

  private dataCSC = {
    data: [
      {
        Utilitas: 'Air compres 8 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: null,
        database_name: null,
        Table_Name: null,
        Std_per_Field: null,
        Timing_pengambilan_data: null,
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: null,
        database_name: null,
        Table_Name: null,
        Std_per_Field: null,
        Timing_pengambilan_data: null,
      },
    ],
  };

  private dataLabel = {
    data: [
      {
        Utilitas: 'Air compres 8 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_pack_oc3',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_pack_oc3',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };

  private dataCaser = {
    data: [
      {
        Utilitas: 'Air compres 8 bar',
        Detail_Field: 'Pressure',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_pressure_comp_kobelco',
        Std_per_Field: '7 - 8 Bar',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'flow',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '96_flow_comp_kobelco',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: 'Listrik',
        Detail_Field: 'Voltase',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_voltage_shrink_tray',
        Std_per_Field: '400 ±5% V',
        Timing_pengambilan_data: '10 second',
      },
      {
        Utilitas: null,
        Detail_Field: 'Arus /Ampare',
        Server_name: 'Aveva Historian',
        database_name: 'Runtime',
        Table_Name: '90_current_shrink_tray',
        Std_per_Field: null,
        Timing_pengambilan_data: '10 second',
      },
    ],
  };
  constructor() {}

  getDataPreparation() {
    return this.dataPreparation;
  }

  getDataInjection() {
    return this.dataInjection;
  }

  getDataBlow() {
    return this.dataBlow;
  }
  getDataFiller() {
    return this.dataFiller;
  }
  getDataFLN2() {
    return this.dataLN2;
  }
  getDataCaper() {
    return this.dataCaper;
  }
  getDataCSC() {
    return this.dataCSC;
  }
  getDataLabel() {
    return this.dataLabel;
  }
  getDataCaser() {
    return this.dataCaser;
  }
}
