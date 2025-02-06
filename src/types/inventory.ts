export interface InventoryItem {
  name: string;
  category: string;
  price: string | number;
  quantity: string | number;
  value: string | number;
}

export interface InventoryItemState extends InventoryItem {
  isVisible: boolean;
}
