export default function ColSpanTable({ children }) {
  return (
    <table className="col-span-table">
      <tr>
        {children.map((item, index) => (
          <td key={index}>{children[index]}</td>
        ))}
      </tr>
    </table>
  );
}
