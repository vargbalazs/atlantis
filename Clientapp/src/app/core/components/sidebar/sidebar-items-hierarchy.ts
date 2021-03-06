import { drawerItem } from './sidebar-item.type';

export const drawerItemsHierarchy: drawerItem[] = [
  {
    text: 'sidebar.masterData',
    icon: 'file-data',
    selected: false,
    expanded: false,
    parent: true,
    level: 0,
    id: '0',
    parentId: '',
    translateId: 'sidebar.masterData',
    children: [
      {
        text: 'sidebar.general',
        selected: false,
        expanded: false,
        parent: true,
        level: 1,
        id: '0.1',
        parentId: '0',
        translateId: 'sidebar.general',
        children: [
          {
            text: 'sidebar.companies',
            level: 2,
            id: '0.1.1',
            parentId: '0.1',
            routePath: 'masterdata/general/company',
            translateId: 'sidebar.companies',
          },
          {
            text: 'sidebar.plants',
            level: 2,
            id: '0.1.2',
            parentId: '0.1',
            routePath: 'masterdata/general/plant',
            translateId: 'sidebar.plants',
          },
          {
            text: 'sidebar.plantAreas',
            level: 2,
            id: '0.1.3',
            parentId: '0.1',
            routePath: 'masterdata/general/plantarea',
            translateId: 'sidebar.plantAreas',
          },
          {
            text: 'sidebar.departments',
            level: 2,
            id: '0.1.4',
            parentId: '0.1',
            routePath: 'masterdata/general/department',
            translateId: 'sidebar.departments',
          },
          {
            text: 'sidebar.jobs',
            level: 2,
            id: '0.1.5',
            parentId: '0.1',
            routePath: 'masterdata/general/job',
            translateId: 'sidebar.jobs',
          },
          {
            text: 'sidebar.languages',
            level: 2,
            id: '0.1.6',
            parentId: '0.1',
            routePath: 'masterdata/general/language',
            translateId: 'sidebar.languages',
          },
          {
            text: 'sidebar.dictionary',
            level: 2,
            id: '0.1.7',
            parentId: '0.1',
            translateId: 'sidebar.dictionary',
          },
        ],
      },
      {
        text: 'sidebar.planningAndSettlement',
        selected: false,
        expanded: false,
        parent: true,
        level: 1,
        id: '0.2',
        parentId: '0',
        translateId: 'sidebar.planningAndSettlement',
        children: [
          {
            text: 'sidebar.costAccTypes',
            level: 2,
            id: '0.2.1',
            parentId: '0.2',
            routePath: 'masterdata/planning/costacctype',
            translateId: 'sidebar.costAccTypes',
          },
          {
            text: 'sidebar.costGroups',
            level: 2,
            id: '0.2.2',
            parentId: '0.2',
            routePath: 'masterdata/planning/costgroup',
            translateId: 'sidebar.costGroups',
          },
          {
            text: 'sidebar.costCenters',
            level: 2,
            id: '0.2.3',
            parentId: '0.2',
            routePath: 'masterdata/planning/costcenter',
            translateId: 'sidebar.costCenters',
          },
          {
            text: 'sidebar.costResponsibles',
            level: 2,
            id: '0.2.4',
            parentId: '0.2',
            routePath: 'masterdata/planning/costresp',
            translateId: 'sidebar.costResponsibles',
          },
          {
            text: 'sidebar.costAccounts',
            level: 2,
            id: '0.2.5',
            parentId: '0.2',
            routePath: 'masterdata/planning/costaccount',
            translateId: 'sidebar.costAccounts',
          },
          {
            text: 'sidebar.costAllocations',
            level: 2,
            id: '0.2.6',
            parentId: '0.2',
            routePath: 'masterdata/planning/costallocation',
            translateId: 'sidebar.costAllocations',
          },
        ],
      },
      {
        text: 'sidebar.production',
        selected: false,
        expanded: false,
        parent: true,
        level: 1,
        id: '0.3',
        parentId: '0',
        translateId: 'sidebar.production',
        children: [
          {
            text: 'sidebar.capGroups',
            level: 2,
            id: '0.3.1',
            parentId: '0.3',
            routePath: 'masterdata/production/capgroup',
            translateId: 'sidebar.capGroups',
          },
          {
            text: 'sidebar.salesProducts',
            level: 2,
            id: '0.3.2',
            parentId: '0.3',
            routePath: 'masterdata/production/salesproduct',
            translateId: 'sidebar.salesProducts',
          },
          {
            text: 'sidebar.capTypes',
            level: 2,
            id: '0.3.3',
            parentId: '0.3',
            routePath: 'masterdata/production/captype',
            translateId: 'sidebar.capTypes',
          },
          {
            text: 'sidebar.capUnits',
            level: 2,
            id: '0.3.4',
            parentId: '0.3',
            routePath: 'masterdata/production/capunit',
            translateId: 'sidebar.capUnits',
          },
        ],
      },
    ],
  },
  {
    text: 'sidebar.prodData',
    icon: 'wrench',
    expanded: false,
    selected: false,
    parent: true,
    level: 0,
    id: '1',
    parentId: '',
    translateId: 'sidebar.prodData',
    children: [
      {
        text: 'sidebar.saveActualData',
        level: 1,
        id: '1.1',
        parentId: '1',
        routePath: 'productiondata/actual',
        translateId: 'sidebar.saveActualData',
      },
    ],
  },
  {
    text: 'sidebar.forecasting',
    icon: 'graph',
    selected: false,
    expanded: false,
    parent: true,
    level: 0,
    id: '2',
    parentId: '',
    translateId: 'sidebar.forecasting',
    children: [
      {
        text: 'sidebar.provk',
        level: 1,
        id: '2.1',
        parentId: '2',
        routePath: 'forecast/provk',
        translateId: 'sidebar.provk',
      },
      {
        text: 'sidebar.forecast',
        level: 1,
        id: '2.2',
        parentId: '2',
        routePath: 'forecast/frc',
        translateId: 'sidebar.forecast',
      },
    ],
  },
  {
    text: 'sidebar.plantResult',
    icon: 'currency',
    selected: false,
    expanded: false,
    parent: true,
    level: 0,
    id: '3',
    parentId: '',
    translateId: 'sidebar.plantResult',
    children: [
      {
        text: 'sidebar.uploadPlantCosts',
        level: 1,
        id: '3.1',
        parentId: '3',
        routePath: 'plantresult/uploadcost',
        translateId: 'sidebar.uploadPlantCosts',
      },
      {
        text: 'sidebar.browseBookings',
        level: 1,
        id: '3.3',
        parentId: '3',
        routePath: 'plantresult/browsedata',
        translateId: 'sidebar.browseBookings',
      },
      {
        text: 'sidebar.reports',
        level: 1,
        selected: false,
        expanded: false,
        parent: true,
        id: '3.4',
        parentId: '3',
        translateId: 'sidebar.reports',
        children: [
          {
            text: 'sidebar.costOverview',
            level: 2,
            id: '3.4.1',
            parentId: '3.4',
            routePath: 'plantresult/costcenter',
            translateId: 'sidebar.costOverview',
          },
          {
            text: 'sidebar.plantPl',
            level: 2,
            id: '3.4.2',
            parentId: '3.4',
            routePath: 'plantresult/plantpl',
            translateId: 'sidebar.plantPl',
          },
        ],
      },
    ],
  },
  {
    text: 'sidebar.planning',
    icon: 'calendar',
    selected: false,
    expanded: false,
    parent: true,
    level: 0,
    id: '4',
    parentId: '',
    translateId: 'sidebar.planning',
    children: [
      {
        text: 'sidebar.planningVersions',
        level: 1,
        id: '4.1',
        parentId: '4',
        routePath: 'planning/version',
        translateId: 'sidebar.planningVersions',
      },
      {
        text: 'sidebar.costPlanning',
        level: 1,
        id: '4.2',
        parentId: '4',
        routePath: 'planning/costplanning',
        translateId: 'sidebar.costPlanning',
      },
      {
        text: 'sidebar.hcPlanning',
        level: 1,
        id: '4.3',
        parentId: '4',
        routePath: 'planning/hcplanning',
        translateId: 'sidebar.hcPlanning',
      },
      {
        text: 'sidebar.capPlanning',
        level: 1,
        id: '4.4',
        parentId: '4',
        routePath: 'planning/capplanning',
        translateId: 'sidebar.capPlanning',
      },
    ],
  },
];
