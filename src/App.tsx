import { useCallback, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
  Grid2 as Grid,
  Switch,
  Toolbar,
  AppBar,
  Divider,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import useApp from "@/providers/AppProvider/useApp";
import useFetch from "@/hooks/useFetch";
import Inventory from "@/containers/Inventory";
import { InventoryItem, InventoryItemState } from "@/types/inventory";

function App() {
  const { userType, setUserType } = useApp();
  const {
    isLoading,
    error,
    data = [],
  } = useFetch<InventoryItem[]>(
    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory",
  );
  const [inventoryItems, setInventoryItems] = useState<InventoryItemState[]>();

  useEffect(() => {
    setInventoryItems(data.map((item) => ({ ...item, isVisible: true })));
  }, [data]);

  const handleUpdateInventoryItem = useCallback((item: InventoryItem) => {
    setInventoryItems((prevItems) =>
      prevItems?.map((prevItem) =>
        prevItem.name === item.name
          ? {
              ...prevItem,
              category: item.category,
              quantity: item.quantity,
              price: item.price,
              value: item.value,
            }
          : prevItem,
      ),
    );
  }, []);

  const handleHideInventoryItem = useCallback((item: InventoryItemState) => {
    setInventoryItems((prevItems) =>
      prevItems?.map((prevItem) =>
        item.name === prevItem.name
          ? { ...prevItem, isVisible: !prevItem.isVisible }
          : prevItem,
      ),
    );
  }, []);

  const handleDeleteInventoryItem = useCallback((item: InventoryItemState) => {
    setInventoryItems((prevItems) =>
      prevItems?.filter((prevItem) => item.name !== prevItem.name),
    );
  }, []);

  return (
    <Box component="main">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar variant="dense" sx={{ gap: 2 }}>
            <Grid
              component="label"
              container
              alignItems="center"
              spacing={1}
              ml="auto"
            >
              <Grid>admin</Grid>
              <Grid>
                <Switch
                  checked={userType === "user"}
                  onChange={(event) => {
                    setUserType(event.target.checked ? "user" : "admin");
                  }}
                />
              </Grid>
              <Grid>user</Grid>
            </Grid>
            <Divider orientation="vertical" flexItem variant="middle" />
            <IconButton>
              <LogoutRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
        <Divider />
      </AppBar>
      {isLoading && (
        <Box mt={2} height={400} display="grid" sx={{ placeItems: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && data && !error && (
        <Inventory
          data={inventoryItems ?? []}
          onHideInventoryItem={handleHideInventoryItem}
          onDeleteInventoryItem={handleDeleteInventoryItem}
          onUpdateInventoryItem={handleUpdateInventoryItem}
        />
      )}
      {!isLoading && error && (
        <Box mt={2} textAlign="center">
          <Typography>{error}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default App;
