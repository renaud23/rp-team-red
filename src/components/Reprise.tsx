import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BulletinIndividuel } from "../api/api";
import { useSelector } from "react-redux";
import { fetchBulletins } from "../features/bulletins/repriseSlice";
import { RootState } from "../store";
import { useSingle } from "../tools/useSingle";

const prepareColumns = (editBi: (id: number) => void) => [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "raisonSociale",
    headerName: "Raison Social",
    width: 150,
    editable: false,
  },
  {
    field: "edit",
    headerName: "id",
    renderCell: (b: GridRenderCellParams<BulletinIndividuel, any, any>) => {
      return (
        <IconButton
          color="primary"
          aria-label="Edit"
          onClick={() => editBi(b.row.id)}
        >
          <EditIcon />
        </IconButton>
      );
    },
  },
];

export function Reprise() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [columns, setColumns] = useState<Array<GridColDef<BulletinIndividuel>>>(
    []
  );

  useEffect(() => {
    const editBulletin = (id: number) => navigate(`/reprise/bulletins/${id}`);
    setColumns(prepareColumns(editBulletin));
  }, [navigate]);

  const bulletins = useSelector((state: RootState) => state.reprise.bulletins);

  useSingle(() => {
    dispatch(fetchBulletins());
  });

  if (!bulletins) {
    return <>Waiting...</>;
  }
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={bulletins}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
