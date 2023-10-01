export interface AddChipProps {
  name: string;
  label: string
  action: string;
  chipsData?: string[];
  updateData: (newInfo: string[]) => void;
}
