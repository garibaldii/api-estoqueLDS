import Produto from "../Model/abstract/Produto";

export const removeCodigoBarrasDuplicado = (listaProdutos: Produto[]) =>
    listaProdutos.filter(
        (p, index, self) =>
            index === self.findIndex((q) => q.codigoDeBarras === p.codigoDeBarras)
    );