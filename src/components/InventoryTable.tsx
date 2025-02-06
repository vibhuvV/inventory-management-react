import {
  IconButton,
  Typography,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

type TableHeadTitleProps = {
  value: string;
};

const TableHeadTitle = ({ value }: TableHeadTitleProps) => {
  return (
    <Typography
      variant="caption"
      component="span"
      sx={{
        bgcolor: "background.default",
        color: "primary.main",
        px: 2,
        py: 1,
        borderRadius: 1,
      }}
    >
      {value}
    </Typography>
  );
};

interface InventoryTableColumn<T> {
  title: string;
  dataKey: T;
}

type InventoryTableProps<T extends object> = {
  columns: InventoryTableColumn<keyof T>[];
  rows: T[];
  visibilityKey: keyof T;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  onHide: (row: T) => void;

  disableActions?: boolean;
};

const InventoryTable = <T extends object>({
  columns,
  rows,
  visibilityKey,
  onEdit,
  onHide,
  onDelete,
  disableActions = false,
}: InventoryTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="inventory table">
        <TableHead>
          <TableRow>
            {columns.map(({ title, dataKey }) => (
              <TableCell key={dataKey.toString()}>
                <TableHeadTitle value={title} />
              </TableCell>
            ))}
            <TableCell>
              <TableHeadTitle value="ACTION" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`inventory-item-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map(({ dataKey }, index) => (
                <TableCell
                  key={`${row[dataKey]}-${index}`}
                  sx={(theme) => ({
                    color: row[visibilityKey]
                      ? theme.palette.text.primary
                      : theme.palette.text.disabled,
                  })}
                >
                  {row[dataKey] as string}
                </TableCell>
              ))}
              <TableCell>
                <IconButton
                  color="success"
                  disabled={disableActions || !row[visibilityKey]}
                  onClick={() => onEdit(row)}
                >
                  <EditRoundedIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  disabled={disableActions}
                  onClick={() => onHide(row)}
                >
                  {row[visibilityKey] ? (
                    <VisibilityRoundedIcon />
                  ) : (
                    <VisibilityOffRoundedIcon />
                  )}
                </IconButton>
                <IconButton
                  color="error"
                  disabled={disableActions}
                  onClick={() => onDelete(row)}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
