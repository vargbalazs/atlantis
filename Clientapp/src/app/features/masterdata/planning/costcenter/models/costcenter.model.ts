import { Company } from 'src/app/features/masterdata/general/company/models/company.model';
import { Plant } from 'src/app/features/masterdata/general/plant/models/plant.model';
import { PlantArea } from 'src/app/features/masterdata/general/plantarea/models/plantarea.model';

export class CostCenter {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public year?: number,
    public yearDate?: Date,
    public companyId?: number,
    public plantId?: number,
    public plantAreaId?: number,
    public company?: Company,
    public plant?: Plant,
    public plantArea?: PlantArea
  ) {}
}
