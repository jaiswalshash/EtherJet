import Papa from 'papaparse';

export async function convertCsvToJson(csvFilePath) {
  try {
    const response = await fetch(csvFilePath);
    const data = await response.text();
    const jsonData = Papa.parse(data, { header: true, skipEmptyLines: true });
    return jsonData.data;
  } catch (error) {
    return [];
  }
}
