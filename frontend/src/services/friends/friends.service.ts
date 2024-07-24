import { ApiPath, ContentType } from "../../common/enums/enums";
import { Friendship, PotentialFriend } from "../../common/types/types";
import { getToken } from "../../utils/auth";
import { Http } from "../http/http.service";

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Friends {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.FRIENDS;
  }

  public getUsersByName(query: string): Promise<PotentialFriend[]> {
    const token = getToken();
    return this.http.load(this.getUrl(`/search?name=${query}`), {
      method: "GET",
      token,
    });
  }

  public sendFriendRequest(friendId: string): Promise<boolean> {
    const token = getToken();
    return this.http.load(this.getUrl(`/requests`), {
      method: "POST",
      token,
      contentType: ContentType.JSON,
      payload: JSON.stringify({friendId}),
    });
  }

  public getFriendRequests(): Promise<Friendship[]> {
    const token = getToken();
    return this.http.load(this.getUrl(`/requests`), {
      method: "GET",
      token,
    });
  }

  public approveFriendRequest(id: string): Promise<Friendship> {
    const token = getToken();
    return this.http.load(this.getUrl(`/requests/approve/${id}`), {
      method: "POST",
      token,
    });
  }

  public denyFriendRequest(id: string): Promise<Friendship> {
    const token = getToken();
    return this.http.load(this.getUrl(`/requests/deny/${id}`), {
      method: "POST",
      token,
    });
  }

  public getFriends(): Promise<Friendship[]> {
    const token = getToken();
    return this.http.load(this.getUrl(``), {
      method: "GET",
      token,
    });
  }


  private getUrl(path = ""): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Friends };
export type { Constructor as AuthConstructor };
