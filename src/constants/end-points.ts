const environment = {
    baseUrl: "https://invest-with-tribe-assignment-2.herokuapp.com",
};

class Endpoints {
    baseUrl: string = environment.baseUrl;
    ENDPOINTS = {
        GET: this.joinPaths(this.baseUrl, "bank-holidays"),
    };
    private joinPaths(...params: string[]) {
        const newUrl = params.join("/");
        return newUrl;
    }
}

export const API = new Endpoints();
