import React, { useState } from 'react';
import PayrollTable from '../PayrollTable';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import "./index.css";

const PayrollDashboard = () => {

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());


    const [payroll, setPayroll] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPayroll = async (month, year) => {
        setLoading(true);
        setError(null);
        setPayroll(null)
        try {
            const response = await fetch(`${API_BASE_URL}/api/payroll/${month}/${year}`);
            if (!response.ok) {
                if (response.status === 404) throw new Error("No payroll found for this period.");
                throw new Error("Failed to fetch payroll.");
            }
            const data = await response.json();
            setPayroll(data.data.payrollDetails);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const runPayroll = async (month, year) => {
        setLoading(true);
        setError(null);
        setPayroll(null)
        try {
            const response = await fetch(`${API_BASE_URL}/api/payroll/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month, year })
            });
            if (response.status === 409) throw new Error("Payroll already exists for this period.");
            if (response.status === 404) throw new Error("Cannot process payroll: No attendance records found for 1/2026.");
            if (!response.ok) throw new Error("Error running payroll.");

            // Refresh data after successful run
            fetchPayroll(month, year);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='grid'>
            <div>
                <div className="controls">

                    <div className="control">
                        <label>Month: </label>
                        <select
                            value={month}
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                        >
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>
                    </div>

                    <div className="control">
                        <label> Year: </label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                        />
                    </div>

                    <div className='actions'>
                        <button className="btn action" onClick={() => fetchPayroll(month, year)}>View Payroll</button>
                        <button className="btn action" onClick={() => runPayroll(month, year)}>Run Payroll</button>
                    </div>

                </div>
            </div>
            <div className='overflow-hidden'>
                {loading && <p>Processing...</p>}
                {error && <p style={{ color: 'red', margin: "5px 0px" }}>{error}</p>}
                {payroll !== null && <PayrollTable data={payroll} />}
            </div>
        </div>
    );
};

export default PayrollDashboard