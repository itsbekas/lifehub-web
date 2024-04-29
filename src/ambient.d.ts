type Provider = {
    id: number;
    name: string;
    type: string;
};

type Module = {
    id: number;
    name: string;
    type: string;
    providers: Array<Provider>;
};
