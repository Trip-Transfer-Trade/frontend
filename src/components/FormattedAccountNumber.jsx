export default function FormattedAccountNumber({ accountNumber }) {
    if (!accountNumber) return <span>-</span>;
  
    const str = accountNumber.toString();
    if (str.length < 7) return <span>{str}</span>;
  
    const formatted = `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6)}`;
  
    return <span>{formatted}</span>;
  }
  