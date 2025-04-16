import * as xlsx from 'xlsx';
import * as path from 'path';

export const lerRegistrosExcel = (): { produto: object, dataCriacao: string }[] => {
    const caminhoArquivo = path.join(__dirname, '../../../estoqueLDS.xlsx');
    const arquivo = xlsx.readFile(caminhoArquivo);

    const aba = arquivo.SheetNames[0];
    const dadosAba = arquivo.Sheets[aba];

    // Converte a aba em JSON
    const infos = xlsx.utils.sheet_to_json<(string | number)[]>(dadosAba, { header: 1 });

    const produtos: { produto: object, dataCriacao: string }[] = [];
    const horarioCriacao = new Date()


    infos.forEach((linha, index) => {
        if (index > 1 && Array.isArray(linha)) {
           // const modelo = String(linha[0]);
            //const codigoDeBarras = String(linha[1]);
            const produto = {
                modelo: String(linha[0]),
                codigoDeBarras: String(linha[1])
            }

            const dataCriacao = `${horarioCriacao.toLocaleDateString('pt-BR')} || ${horarioCriacao.toLocaleTimeString("pt-BR")}`

            produtos.push({ produto, dataCriacao});
        }
    });

    return produtos;
}; 