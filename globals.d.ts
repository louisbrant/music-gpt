declare global {
    interface Window {
      blvd: {
        open: () => void;
        init: (b: { businessId: string }) => void;
      };
    }
  }
  