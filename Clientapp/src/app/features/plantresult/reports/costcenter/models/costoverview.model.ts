import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { PlantArea } from 'src/app/features/masterdata/general/plantarea/models/plantarea.model';
import { CostAccountingType } from 'src/app/features/masterdata/planning/costacctype/models/costacctype.model';
import { CostCenter } from 'src/app/features/masterdata/planning/costcenter/models/costcenter.model';
import { ActVsBudget } from 'src/app/shared/models/actvsbudget.model';

export class CostOverview extends ActVsBudget {
  constructor(
    public plant?: Plant,
    public plantArea?: PlantArea,
    public costCenter?: CostCenter,
    public costAccType?: CostAccountingType,
    public year?: number,
    public month?: number
  ) {
    super();
  }
}
