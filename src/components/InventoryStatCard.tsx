import { ReactNode } from "react";
import { alpha, Card, CardContent, Stack, Typography } from "@mui/material";

type InventoryStatCardProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
};

const InventoryStatCard = ({ icon, title, value }: InventoryStatCardProps) => {
  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        bgcolor: alpha(theme.palette.primary.main, 0.2),
        flex: 1,
      })}
    >
      <CardContent sx={{ display: "flex", gap: 2 }}>
        {icon}
        <Stack>
          <Typography variant="caption">{title}</Typography>
          <Typography variant="h2" fontWeight="400">
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InventoryStatCard;
