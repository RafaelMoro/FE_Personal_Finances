export interface AddChipProps {
  name: string;
  label: string
  action: string;
  updateData: (newInfo: string[]) => void;
}
