import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, Form } from "react-bootstrap";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../firebase";
import { format } from "date-fns";

export default function Billing() {
  //! Get procedure data
  const currentUser = useAuth();
  const [procedureData, setProcedureData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    let procedureArray = [];
    async function allProcedures() {
      const procedureSubcollection = await getDocs(
        collection(db, "users", `${currentUser?.uid}`, "procedures")
      );
      procedureSubcollection?.forEach((doc) => {
        procedureArray?.push(doc.data());
      });
      setProcedureData(procedureArray);
    }
    allProcedures();
  }, [currentUser?.uid]);

  const columns = [
    { id: "clinicSession", label: "Clinic/Session", minWidth: 200 },
    { id: "date", label: "Date (DD/MM/YYYY)", minWidth: 180 },
    {
      id: "amount",
      label: "Amount ($SGD)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(clinicSession, date, amount) {
    return { clinicSession, date, amount };
  }

  const filteredData = procedureData.filter((data) => {
    if (
      (month === "Month" || month === "") &&
      (year === "Year" || year === "")
    ) {
      console.log("ALL PROCEDURES", data);
      return [data];
    } else if (
      format(new Date(data.Date), "yyyy") === year &&
      (month === "Month" || month === "")
    ) {
      console.log("FILTERED BY YEAR", data);
      return [data];
    } else if (
      format(new Date(data.Date), "MMM") === month &&
      (year === "Year" || year === "")
    ) {
      console.log("FILTERED BY MONTH", data);
      return [data];
    } else if (
      format(new Date(data.Date), "MMM") === month &&
      format(new Date(data.Date), "yyyy") === year
    ) {
      console.log("FILTERED BY BOTH", data);
      return [data];
    }
    return null;
  });

  let rows = filteredData.map((item) => {
    return createData(
      item?.Location + " / " + item?.Session,
      format(new Date(item?.Date), "dd/MM/yyyy"),
      item?.Charged * (item?.Commission / 100)
    );
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Container
        style={{
          marginTop: "-100px",
        }}
      >
        <div style={{ display: "flex" }} className="pt-4">
          <h4>Billing Period</h4>

          <Form.Select
            className="w-50 mx-3"
            style={{ maxWidth: "100px" }}
            onChange={(e) => setYear(e?.target?.value)}
          >
            <option>Year</option>
            <option>2021</option>
            <option>2020</option>
          </Form.Select>
          <Form.Select
            className="w-50"
            style={{ maxWidth: "100px" }}
            onChange={(e) => setMonth(e?.target?.value)}
          >
            <option>Month</option>
            <option>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
            <option>Apr</option>
            <option>May</option>
            <option>Jun</option>
            <option>Jul</option>
            <option>Aug</option>
            <option>Sep</option>
            <option>Oct</option>
            <option>Nov</option>
            <option>Dec</option>
          </Form.Select>
        </div>

        <div>
          <h4 className="my-5">Billing Details</h4>
        </div>

        <Paper sx={{ width: "80%", overflow: "hidden" }} elevation={3}>
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
    </>
  );
}
