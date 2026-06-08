import "./index.css";

const PayrollTable = ({ data }) => {
    if (data.length === 0) return <p className="empty-msg">No records to display.</p>;

    return (
        <div className="payroll-table-wrapper">
            <table className="payroll-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Basic Salary</th>
                        <th>Days Present</th>
                        <th>Gross Pay</th>
                        <th>PF Deduction</th>
                        <th>Professional Tax</th>
                        <th>Net Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(emp => (
                        <tr key={emp.employeeId}>
                            <td>{emp.employeeId}</td>
                            <td>{emp.employee.name}</td>
                            <td>₹{emp.basicSalary}</td>
                            <td>{emp.daysPresent}</td>
                            <td>₹{emp.grossPay}</td>
                            <td>₹{emp.pfDeduction}</td>
                            <td>₹{emp.professionalTax}</td>
                            <td>₹{emp.netPay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default PayrollTable