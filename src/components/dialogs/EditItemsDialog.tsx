import { ChangeEvent, PropsWithChildren, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  Grid2 as Grid,
  InputLabel,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { InventoryItem } from "@/types/inventory";
import { getNumericValueFromCurrency } from "@/lib/utils";

interface InventoryEditFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedItem: InventoryItem) => void;

  inventoryItem?: InventoryItem;
}

const InventoryEditFormDialog = ({
  open,
  onSave,
  onClose,
  inventoryItem,
}: InventoryEditFormDialogProps) => {
  const [formData, setFormData] = useState<InventoryItem>({
    name: inventoryItem?.name ?? "",
    category: inventoryItem?.category ?? "",
    price: getNumericValueFromCurrency(
      inventoryItem?.price ? inventoryItem.price.toString() : "",
    ),
    quantity: inventoryItem?.quantity?.toString() ?? "",
    value: getNumericValueFromCurrency(
      inventoryItem?.value ? inventoryItem.value.toString() : "",
    ),
  });

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...formData,
      value: formData.value !== "0" ? "$" + formData.value : formData.value,
      price: formData.price !== "0" ? "$" + formData.price : formData.price,
    });
    onClose();
  };

  const hasValidValues = useMemo(
    () => Object.values(formData).every((val) => !!val),
    [formData],
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleEditFormSubmit,
        },
      }}
    >
      <DialogTitle
        component={Box}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography variant="h3">Edit Product</Typography>
          <Typography variant="subtitle1">{inventoryItem?.name}</Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{
            padding: 1,
            minWidth: 0,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Grid mt={2} container spacing={2}>
          <Grid size={6}>
            <CustomFormGroup>
              <InputLabel htmlFor="category">Category</InputLabel>
              <TextField
                id="category"
                name="category"
                size="small"
                fullWidth
                variant="filled"
                value={formData.category}
                onChange={onValueChange}
              />
            </CustomFormGroup>
          </Grid>
          <Grid size={6}>
            <CustomFormGroup>
              <InputLabel htmlFor="price">Price</InputLabel>
              <TextField
                id="price"
                name="price"
                size="small"
                fullWidth
                variant="filled"
                type="number"
                value={formData.price}
                onChange={onValueChange}
              />
            </CustomFormGroup>
          </Grid>
          <Grid size={6}>
            <CustomFormGroup>
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <TextField
                id="quantity"
                name="quantity"
                size="small"
                fullWidth
                variant="filled"
                type="number"
                value={formData.quantity}
                onChange={onValueChange}
              />
            </CustomFormGroup>
          </Grid>
          <Grid size={6}>
            <CustomFormGroup>
              <InputLabel htmlFor="value">Value</InputLabel>
              <TextField
                id="value"
                name="value"
                size="small"
                fullWidth
                variant="filled"
                type="number"
                value={formData.value}
                onChange={onValueChange}
              />
            </CustomFormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={!hasValidValues}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CustomFormGroup = ({ children }: PropsWithChildren) => {
  return (
    <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {children}
    </FormGroup>
  );
};

export default InventoryEditFormDialog;
