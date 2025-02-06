import { useCallback, useMemo, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import InventoryTable from "@/components/InventoryTable";
import useApp from "@/providers/AppProvider/useApp";
import FormDialog from "@/components/dialogs/EditItemsDialog";
import { InventoryItem, InventoryItemState } from "@/types/inventory";
import InventoryStatCard from "@/components/InventoryStatCard";
import { getNumericValueFromCurrency } from "@/lib/utils";

interface InventoryProps {
  data: InventoryItemState[];
  onHideInventoryItem: (item: InventoryItemState) => void;
  onDeleteInventoryItem: (item: InventoryItemState) => void;
  onUpdateInventoryItem: (item: InventoryItem) => void;
}

const Inventory = ({
  data,
  onHideInventoryItem,
  onDeleteInventoryItem,
  onUpdateInventoryItem,
}: InventoryProps) => {
  const { userType } = useApp();

  const [selectedItem, setSelectedItem] = useState<InventoryItemState>();

  const onEditDialogClose = useCallback(() => {
    setSelectedItem(undefined);
  }, []);

  const onEditDialogOpen = useCallback((items: InventoryItemState) => {
    setSelectedItem(items);
  }, []);

  const onSaveInventoryItem = useCallback(
    (items: InventoryItem) => {
      onUpdateInventoryItem(items);
      onEditDialogClose();
    },
    [onEditDialogClose, onUpdateInventoryItem],
  );

  const inventoryStats = useMemo(() => {
    const filteredData = data.filter((item) => item.isVisible);

    return [
      {
        icon: <ShoppingCartRoundedIcon />,
        title: "Total Products",
        value: filteredData.length,
      },
      {
        icon: <CurrencyExchangeRoundedIcon />,
        title: "Total store value",
        value: filteredData.reduce(
          (totalValue, item) =>
            totalValue +
            (typeof item.value === "string"
              ? Number(getNumericValueFromCurrency(item.value))
              : item.value),
          0,
        ),
      },
      {
        icon: <RemoveShoppingCartRoundedIcon />,
        title: "Out of stocks",
        value: filteredData.filter((item) => Number(item.quantity) === 0)
          .length,
      },
      {
        icon: <CategoryRoundedIcon />,
        title: "No of Category",
        value: filteredData.reduce(
          (acc, item) => new Set(acc.add(item.category)),
          new Set(),
        ).size,
      },
    ];
  }, [data]);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Typography variant="h1" gutterBottom>
        Inventory stats
      </Typography>
      <Box
        display="flex"
        gap={2}
        mb={4}
        flexDirection={{ xs: "column", md: "row" }}
      >
        {inventoryStats.map((stat) => (
          <InventoryStatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </Box>
      {selectedItem && (
        <FormDialog
          open={!!selectedItem}
          onClose={onEditDialogClose}
          onSave={onSaveInventoryItem}
          inventoryItem={selectedItem}
        />
      )}
      <InventoryTable
        columns={[
          {
            dataKey: "name",
            title: "Name",
          },
          {
            dataKey: "category",
            title: "Category",
          },
          {
            dataKey: "price",
            title: "Price",
          },
          {
            dataKey: "quantity",
            title: "Quantity",
          },
          {
            dataKey: "value",
            title: "Value",
          },
        ]}
        visibilityKey="isVisible"
        rows={data}
        disableActions={userType === "user"}
        onEdit={onEditDialogOpen}
        onHide={onHideInventoryItem}
        onDelete={onDeleteInventoryItem}
      />
    </Container>
  );
};

export default Inventory;
