import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "react-bootstrap";

const columns = [
  { id: "clinicSession", label: "Clinic/Session", minWidth: 200 },
  { id: "date", label: "Date (DD/MM/YYYY)", minWidth: 180 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(clinicSession, date, amount) {
  return { clinicSession, date, amount};
}

const rows = [
  createData("NUH", "11/10/2021", 1324),
  createData("NUH", "11/10/2021", 1403),
  createData("Q&M - Punggol", "13/10/2021", 6048),
  createData("TTSH", "14/10/2021", 3271),
  createData("Q&M - Punggol", "15/10/2021", 3760),
  createData("Kovan", "17/10/2021", 2547),
  createData("Kovan", "17/10/2021", 8301),
  createData("NUH", "18/10/2021", 4857),
  createData("Q&M - Punggol", "20/10/2021", 1265),
  createData("TTSH", "21/10/2021", 1263),
  createData("Q&M - Punggol", "22/10/2021", 6702),
  createData("NUH", "1/11/2021", 6754),
  createData("TTSH", "3/11/2021", 1467),
  createData("Q&M - Punggol", "5/11/2021", 2009),
  createData("Q&M - Punggol", "5/11/2021", 2101),
];

export default function Billing() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <>
    <Container>
      <div style={{ display: "flex" }} className="pt-4">
        <h4>Billing Period</h4>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle ms-4 py-1 px-4"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ border: "1px solid black" }}
          >
            Month
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li>
              <button className="dropdown-item" type="button">
                Action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Another action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle ms-4 py-1 px-4"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ border: "1px solid black" }}
          >
            Year
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li>
              <button className="dropdown-item" type="button">
                Action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Another action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className="my-5">Billing Details</h4>
      </div>
      
      <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={3}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
    <TableContainer className="pt-4">
                <Container style={{backgroundColor:"#dee2e6", borderRadius:"10px", color: "#495057", maxWidth: "300px"}} className="w-100 py-3">
                    <h6>LOCATION</h6>
                    <h6>Total Billed Amount: $</h6>
                    <h6>Named Session 1: $</h6>
                    <h6>Named Session 2: $</h6>
                </Container>
                <Container style={{backgroundColor:"#dee2e6", borderRadius:"10px", color: "#495057", maxWidth: "300px"}} className="w-100 mt-5 py-3">
                    <h6>LOCATION</h6>
                    <h6>Total Billed Amount: $</h6>
                    <h6>Named Session 1: $</h6>
                    <h6>Named Session 2: $</h6>
                </Container>
                <Container style={{backgroundColor:"#dee2e6", borderRadius:"10px", color: "#495057", maxWidth: "300px"}} className="w-100 mt-5 py-3">
                    <h6>LOCATION</h6>
                    <h6>Total Billed Amount: $</h6>
                    <h6>Named Session 1: $</h6>
                    <h6>Named Session 2: $</h6>
                </Container>
    </TableContainer>
    </>
  );
}
