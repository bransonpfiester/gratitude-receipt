export interface GratitudeEntry {
  id: string;
  text: string;
  timestamp: number;
  date: string; // formatted date
}

export interface ReceiptState {
  entries: GratitudeEntry[];
}
