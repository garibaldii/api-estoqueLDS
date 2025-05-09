import * as xlsx from 'xlsx';
import * as path from 'path';
import { criaInversorEmLote } from './Produtos/Inversor';
import { criaPainelEmLote } from './Produtos/Painel';
import { HttpError } from '../Utils/HttpError';

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

            produtos.push({ produto, dataCriacao });
        }
    });

    return produtos;
};


export const uploadProductFile = async (fileBuffer: Buffer) => {
    const workBook = xlsx.read(fileBuffer, { type: "buffer" });
    const errors: any[] = [];

    const extractSheetData = (sheetName: string) => {
        const sheet = workBook.Sheets[sheetName];
        return xlsx.utils.sheet_to_json<any[]>(sheet, { header: 0 });
    };

    const panelData = extractSheetData(workBook.SheetNames[0]);
    const inverterData = extractSheetData(workBook.SheetNames[1]);

    try {
        if (inverterData.length) await criaInversorEmLote(inverterData);
    } catch (e: any) {
        errors.push({"Inversores": e.message});
    }

    try {
        if (panelData.length) await criaPainelEmLote(panelData);
    } catch (e: any) {
        errors.push({"Paineis": e.message});
    }

    if (errors.length) throw new HttpError("Código de Barras Duplicado", 409, errors)

    return { inverterData, panelData };
};





