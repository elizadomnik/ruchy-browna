import * as XLSX from "xlsx";

/**
 * Zapisuje trajektorie punktu x i y do pliku XLS.
 */

export const saveTrajectoryToXLS = (trajectory: {
  x: number[];
  y: number[];
}) => {
  const data = trajectory.x.map((x, index) => [x, trajectory.y[index]]);

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Trajectory");

  const wbBlob = new Blob(
    [XLSX.write(wb, { bookType: "xls", type: "buffer" })],
    { type: "application/vnd.ms-excel" }
  );

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(wbBlob);
  link.download = "brown.xls";

  link.click();
};
