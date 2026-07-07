import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Redemption from "@/models/Redemption";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

// Force Node.js runtime to support binary streams and fs modules required by these libraries
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "xlsx";

    // 1. Fetch Aggregation Data
    const brandPerformance = await Redemption.aggregate([
      { $match: { status: "completed" } },
      { 
        $group: {
          _id: "$requestedBrand",
          totalPayoutAmount: { $sum: "$usdAmount" },
          totalPointsBurned: { $sum: "$pointsDeducted" },
          redemptionCount: { $sum: 1 }
        }
      },
      { $sort: { totalPayoutAmount: -1 as const } }
    ]);

    // 2. Generate Export based on format
    if (format === "xlsx" || format === "csv") {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Brand Performance");

      sheet.columns = [
        { header: "Brand", key: "brand", width: 30 },
        { header: "Total Payout ($)", key: "totalPayoutAmount", width: 20 },
        { header: "Total Points Burned", key: "totalPointsBurned", width: 25 },
        { header: "Redemption Count", key: "redemptionCount", width: 20 }
      ];

      brandPerformance.forEach(stat => {
        sheet.addRow({
          brand: stat._id,
          totalPayoutAmount: stat.totalPayoutAmount,
          totalPointsBurned: stat.totalPointsBurned,
          redemptionCount: stat.redemptionCount
        });
      });

      if (format === "csv") {
        const buffer = await workbook.csv.writeBuffer();
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": 'attachment; filename="report.csv"'
          }
        });
      } else {
        const buffer = await workbook.xlsx.writeBuffer();
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="report.xlsx"'
          }
        });
      }
    } 
    
    if (format === "pdf") {
      return new Promise<NextResponse>((resolve, reject) => {
        try {
          const doc = new PDFDocument();
          const chunks: Buffer[] = [];

          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => {
            const result = Buffer.concat(chunks);
            resolve(
              new NextResponse(result, {
                status: 200,
                headers: {
                  "Content-Type": "application/pdf",
                  "Content-Disposition": 'attachment; filename="report.pdf"'
                }
              })
            );
          });

          // Draw PDF Content
          doc.fontSize(20).text("Brand Performance Report", { align: "center" });
          doc.moveDown();

          brandPerformance.forEach(stat => {
            doc.fontSize(12).text(`Brand: ${stat._id}`);
            doc.fontSize(10).text(`Payout: $${stat.totalPayoutAmount} | Points Burned: ${stat.totalPointsBurned} | Count: ${stat.redemptionCount}`);
            doc.moveDown();
          });

          doc.end();
        } catch (err) {
          reject(err);
        }
      });
    }

    return NextResponse.json({ success: false, error: "Unsupported format" }, { status: 400 });

  } catch (error: any) {
    console.error("Error generating export:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to export report" },
      { status: 500 }
    );
  }
}
