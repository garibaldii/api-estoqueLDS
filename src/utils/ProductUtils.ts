import Product from "../model/abstract/Product";

export const removeDuplicatedBarsCode = (productList: Product[]) =>
    productList.filter(
        (p, index, self) =>
            index === self.findIndex((q) => q.barsCode === p.barsCode)
    );