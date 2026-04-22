import { useState } from "react";

export default function PrintLayout({ children, title = "Form" }) {
  const [paper, setPaper] = useState("letter"); // "letter" | "legal"

  return (
    <div>
      {/* Screen-only toolbar */}
      <div className="no-print" style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 16px", background: "#1a1a2e", color: "#fff",
        marginBottom: 0, flexWrap: "wrap",
      }}>
        <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{title}</span>
        <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <span>Paper:</span>
          <select
            value={paper}
            onChange={e => setPaper(e.target.value)}
            style={{ padding: "4px 8px", borderRadius: 5, fontSize: 13 }}
          >
            <option value="letter">8.5 × 11 (Letter)</option>
            <option value="legal">8.5 × 13 (Legal)</option>
          </select>
        </label>
        <button
          onClick={() => window.print()}
          style={{
            background: "#27ae60", color: "#fff", border: "none",
            borderRadius: 7, padding: "7px 18px", fontWeight: 700,
            fontSize: 14, cursor: "pointer",
          }}
        >
          🖨 Print / Save PDF
        </button>
      </div>

      {/* Print styles injected inline */}
      <style>{`

      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box; /* This is the most important line */
        }

        @media print {
          .no-print { display: none !important; }
          .back-btn { display: none !important; }
          body { margin: 0; }
          @page {
            size: ${paper === "legal" ? "8.5in 13in" : "8.5in 11in"};
            margin: 0.5in;
          }
          .page-break { page-break-after: always; }
          .form-page { page-break-inside: avoid; }
        }
        .print-page {
          width: ${paper === "legal" ? "10in" : "8.5in"};
          min-height: ${paper === "legal" ? "12in" : "10in"};
          margin: 0 auto;
          background: #fff;
          font-family: Arial, sans-serif;
          font-size: 11px;
          color: #000;
          padding: 0.5in;
          box-sizing: border-box;
        }
        .form-header { text-align: center;}
        .form-header .org { font-size: 16px; line-height: 16px; }

        .form-title { 
          font-size: 16px; 
          text-align: left;
          gap: 36px;
          }

        .field-line {
          display: inline-block;
          border-bottom: 1px solid #000;
          width:100%;
          vertical-align: bottom;
          margin: 0 2px;
          font-family: '"Arial", Times, serif'
        }
        .field-line.lg  { min-width: 160px; }
        .field-line.xl  { min-width: 250px; }
        .field-line.full { width: 100%; display: block; margin-top: 2px; }

      
        .row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 5px; flex-wrap: wrap; }

        .label { white-space: nowrap; font-size: 16px; }
        .section-title { font-weight: bold; font-size: 11px; margin: 8px 0 4px; text-transform: uppercase; }
        .sig-block { display: flex; justify-content: space-between; margin-top: 16px; }
        .sig-line { text-align: center; min-width: 180px; }
        .sig-line .line { border-top: 1px solid #000; margin-bottom: 3px; }
        table { border-collapse: collapse; width: 100%; font-size: 10px; }
        table td, table th { border: 1px solid #000; padding: 2px 4px; vertical-align: top; }
        table th { background: #f0f0f0; font-weight: bold; text-align: center; }
        .checkbox { display: inline-block; width: 10px; height: 10px; border: 1px solid #000; margin-right: 3px; vertical-align: middle; }
        .checked { background: #000; }

        @media print {
        .page-break {
          display: block;
          break-after: page;
        }
      }

      `}</style>

      <div className="print-page">
        {children}
      </div>
    </div>
  );
}