import FileSaver from "file-saver";

export const downloadJsonFile = (fileName: string, data: string) => {
  const contentType = "text/json;charset=utf-8";

  const blob = new Blob([data], { type: contentType });

  FileSaver.saveAs(blob, `${fileName}.json`);
};
