import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  
  menus = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Compras',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Importar Compras',
          url: 'cargaFacComp',
          badge: {
            text: 'Pro ',
            class: 'badge-success'
          }
        },
        {
          title: 'Dashboard 2'
        },
        {
          title: 'Dashboard 3'
        }
      ]
    },
    {
      title: 'Ventas',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
      submenus: [
        {
          title: 'Importar Ventas',
          url: 'impVentas'
        },
        {
          title: 'Consulta Ventas',
          url: 'verVentas'
        },
        {
          title: 'Credit cart'
        }
      ]
    },
    {
      title: 'Sueldos',
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'General',
        },
        {
          title: 'Panels'
        },
        {
          title: 'Tables'
        },
        {
          title: 'Icons'
        },
        {
          title: 'Forms'
        }
      ]
    },
    {
      title: 'Asientos Contables',
      icon: 'fa fa-chart-line',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Asiento Diario',
          url: 'asientoDiario'
        },
        {
          title: 'Importar Asiento',
          url: 'importarAsientos'
        },
        {
          title: 'Bar chart'
        },
        {
          title: 'Histogram'
        }
      ]
    },
    {
      title: 'Bancos',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Conciliación Bancaria',
          url: 'conciliacionBancaria'
        },
        {
          title: 'Importar Extractos Bancarios',
          url: 'impExtractos'
        }
      ]
    },
    {
      title: 'Configuraciones',
      type: 'header'
    },
    {
      title: 'Plan de Cuentas',
      icon: 'fa fa-book',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
      submenus: [
        {
          title: 'Rubro',
          url: 'rubro'
        },                
        {
          title: 'Cuenta Contable',
          url: 'cuentaContable'
        },
        {
          title: 'Plan de Cuentas',
          url: 'verPlanCuentas'
        }
      ]
    },
    {
      title: 'Calendar',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
    {
      title: 'Examples',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
