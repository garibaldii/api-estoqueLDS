import * as xlsx from 'xlsx';
import * as path from 'path';
import { HttpError } from '../utils/HttpError';
import { postManyInverters } from './products/InverterService';
import { postManyPanels } from './products/PanelService';

export const readExcelRecords = (): { product: object, incomingDate: string }[] => {
    const filePath = path.join(__dirname, '../../../estoqueLDS.xlsx');
    const file = xlsx.readFile(filePath);

    const sheetName = file.SheetNames[0];
    const sheetData = file.Sheets[sheetName];

    // Converte a aba em JSON
    const infos = xlsx.utils.sheet_to_json<(string | number)[]>(sheetData, { header: 1 });

    const products: { product: object, incomingDate: string }[] = [];
    const creationHour = new Date()

    infos.forEach((line, index) => {
        if (index > 1 && Array.isArray(line)) {
            // const modelo = String(linha[0]);
            //const codigoDeBarras = String(linha[1]);
            const product = {
                model: String(line[0]),
                barsCode: String(line[1])
            }

            const incomingDate = `${creationHour.toLocaleDateString('pt-BR')} || ${creationHour.toLocaleTimeString("pt-BR")}`

            products.push({ product, incomingDate });
        }
    });

    return products;
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
        if (inverterData.length) await postManyInverters(inverterData);
    } catch (e: any) {
        errors.push({ "Inversores": e.message });
    }

    try {
        if (panelData.length) await postManyPanels(panelData);
    } catch (e: any) {
        errors.push({ "Paineis": e.message });
    }

    if (!panelData.length && !inverterData.length) throw new HttpError("Planilha vazia", 400, { inverterData, panelData })

    if (errors.length) throw new HttpError("Código de Barras Duplicado", 409, errors)

    return { inverterData, panelData };
};





