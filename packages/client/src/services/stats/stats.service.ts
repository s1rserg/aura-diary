import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import { StatsAllPeriodsData } from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Stats {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.STATS;
  }

  public getAllPeriodsStats(id: string): Promise<StatsAllPeriodsData> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}/all`), {
      method: 'GET',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Stats };
export type { Constructor as StatsConstructor };
