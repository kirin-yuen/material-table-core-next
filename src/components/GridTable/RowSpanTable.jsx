export default function RowSpanTable({ children }) {
  return (
    <table className="row-span-table">
      {children.map((item, index) => (
        <tr key={index}>
          <td>{children[index]}</td>
        </tr>
      ))}
    </table>
  );
}
