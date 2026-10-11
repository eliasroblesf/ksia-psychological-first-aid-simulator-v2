import jsPDF from 'jspdf';
import { PfaAuditReport } from '../types/pfa';
import { PFA_SCENARIOS } from '../data/pfaDataset';

export function generatePfaCertificatePdf(report: PfaAuditReport): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  const cardX = margin + 4; // 18mm
  const cardWidth = contentWidth - 8; // 174mm
  const cardRight = cardX + cardWidth; // 192mm

  // Background styling
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer Tactical Border
  doc.setDrawColor(30, 41, 59); // slate-800
  doc.setLineWidth(0.9);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2);

  // Inner Golden Accent Border
  doc.setDrawColor(202, 138, 4); // amber-600
  doc.setLineWidth(0.35);
  doc.rect(margin + 2, margin + 2, contentWidth - 4, pageHeight - margin * 2 - 4);

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin + 2.5, margin + 2.5, contentWidth - 5, 27, 'F');

  // Top Organization Branding
  doc.setTextColor(250, 204, 21); // amber-400
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.text('KING SALMAN INTERNATIONAL AIRPORT (KSIA) - RIYADH', pageWidth / 2, margin + 8.5, { align: 'center' });

  doc.setTextColor(226, 232, 240); // slate-200
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Emergency Response Team (ERT) & Administration Complex Crisis Operations', pageWidth / 2, margin + 14, { align: 'center' });
  doc.text('Directorate of Occupational Safety, Health & Human Support', pageWidth / 2, margin + 19, { align: 'center' });

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(6.5);
  doc.text('WHO PFA Protocols | IASC MHPSS Standards | Saudi MOH 937 | NCMHP Framework', pageWidth / 2, margin + 24, { align: 'center' });

  // Audit Title
  let curY = margin + 34; // 48mm
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('OFFICIAL AUDIT REPORT', pageWidth / 2, curY, { align: 'center' });

  curY += 5; // 53mm
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.text('PSYCHOLOGICAL FIRST AID (PFA) & HUMAN SUPPORT COMPETENCY AUDIT', pageWidth / 2, curY, { align: 'center' });

  // Recipient / Participant Info Box
  curY += 4.5; // 57.5mm
  const recipientBoxHeight = 22;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(cardX, curY, cardWidth, recipientBoxHeight, 2, 2, 'FD');

  // Subtle vertical divider between left and right columns
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(pageWidth / 2, curY + 3, pageWidth / 2, curY + recipientBoxHeight - 3);

  const leftColX = cardX + 4; // 22mm
  const rightColX = pageWidth / 2 + 5; // 110mm

  // Left Column: Responder Name & Employee ID
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.text('RESPONDER NAME:', leftColX, curY + 5.5);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  // Truncate safely or split to max 78mm width so it never overlaps the right column
  const cleanName = report.participant.fullName.trim().toUpperCase() || 'KSIA RESPONDER';
  const nameLines = doc.splitTextToSize(cleanName, 78);
  doc.text(nameLines[0], leftColX, curY + 10.5);

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.text('EMPLOYEE ID:', leftColX, curY + 16.5);

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`#${report.participant.employeeId.trim()}`, leftColX + 22, curY + 16.5);

  // Right Column: Evaluation Date & Audit Code
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.text('EVALUATION DATE:', rightColX, curY + 5.5);

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(report.participant.assessmentDate, rightColX + 28, curY + 5.5);

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('AUDIT REFERENCE CODE:', rightColX, curY + 11.5);

  doc.setTextColor(15, 23, 42);
  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  const hashLines = doc.splitTextToSize(report.auditHash.toUpperCase(), 74);
  doc.text(hashLines[0], rightColX, curY + 16.5);

  // Performance Metric Bar
  curY += recipientBoxHeight + 3.5; // 83mm
  const isPassed = report.score >= 5;
  const isDistinction = report.score === report.totalQuestions;
  const scorePercent = Math.round((report.score / report.totalQuestions) * 100);

  const designation = isDistinction
    ? 'PFA Tactical Specialist (Distinction)'
    : isPassed
    ? 'PFA Tactical Responder (Proficient)'
    : 'Operational Protocol Review';

  const metricBarHeight = 11;
  doc.setFillColor(isPassed ? 240 : 254, isPassed ? 253 : 242, isPassed ? 244 : 242);
  doc.setDrawColor(isPassed ? 34 : 239, isPassed ? 197 : 68, isPassed ? 94 : 68);
  doc.setLineWidth(0.4);
  doc.roundedRect(cardX, curY, cardWidth, metricBarHeight, 2, 2, 'FD');

  doc.setTextColor(isPassed ? 22 : 185, isPassed ? 101 : 28, isPassed ? 52 : 28);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`AUDIT STATUS: ${designation.toUpperCase()}`, cardX + 5, curY + 7);

  // Right-aligned score positioned safely inside the card
  doc.setFontSize(9);
  doc.text(
    `SCORE: ${report.score}/${report.totalQuestions} (${scorePercent}%)`,
    cardRight - 5,
    curY + 7,
    { align: 'right' }
  );

  // Modular Scenarios Breakdown Table
  curY += metricBarHeight + 3.5; // 97.5mm
  const tableHeaderHeight = 6.5;
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(cardX, curY, cardWidth, tableHeaderHeight, 'F');

  // Column X-anchors (Total table width = 174mm, cardX = 18mm, cardRight = 192mm)
  // Col 1: 18mm -> 78mm (width 60mm)
  // Col 2: 80mm -> 106mm (width 26mm)
  // Col 3: 108mm -> 132mm (width 24mm)
  // Col 4: 134mm -> 190mm (width 56mm)
  const col1X = cardX + 3; // 21mm
  const col2X = cardX + 63; // 81mm
  const col3X = cardX + 91; // 109mm
  const col4X = cardX + 117; // 135mm
  const col4Width = cardRight - col4X - 2; // 55mm

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('SCENARIO BRIEFING & TOPIC', col1X, curY + 4.5);
  doc.text('PHASE', col2X, curY + 4.5);
  doc.text('RESULT', col3X, curY + 4.5);
  doc.text('OPTIMAL ACTION RATIONALE', col4X, curY + 4.5);

  curY += tableHeaderHeight;

  // Table rows: 6 scenarios
  const rowHeight = 12.2;
  PFA_SCENARIOS.forEach((scenario, index) => {
    const ans = report.answers.find((a) => a.scenarioId === scenario.id);
    const correct = ans ? ans.isCorrect : false;

    // Alternate row background
    doc.setFillColor(index % 2 === 0 ? 255 : 248, index % 2 === 0 ? 255 : 250, index % 2 === 0 ? 255 : 252);
    doc.rect(cardX, curY, cardWidth, rowHeight, 'F');

    // Bottom border line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(cardX, curY + rowHeight, cardRight, curY + rowHeight);

    // Column 1: Scenario Title & Category (Strictly bounded to max 58mm)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    const titleText = `${scenario.id}. ${scenario.title.en}`;
    const titleLines = doc.splitTextToSize(titleText, 58);
    doc.text(titleLines[0], col1X, curY + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(100, 116, 139);
    const categoryText = scenario.category ? scenario.category.en : '';
    const categoryLines = doc.splitTextToSize(categoryText, 58);
    doc.text(categoryLines[0], col1X, curY + 8.2);

    // Column 2: Phase (Centered vertically)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(51, 65, 85);
    const phaseLabel = scenario.phaseId === 'phase1' ? 'Phase 1: On-Scene' : 'Phase 2: Self-Care';
    doc.text(phaseLabel, col2X, curY + 6.2);

    // Column 3: Result Badge
    if (correct) {
      doc.setTextColor(22, 163, 74);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text('COMPLIANT', col3X, curY + 6.2);
    } else {
      doc.setTextColor(220, 38, 38);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text('REVIEWED', col3X, curY + 6.2);
    }

    // Column 4: Optimal Action Rationale (Strictly bounded with splitTextToSize)
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    const explanationLines = doc.splitTextToSize(scenario.explanation.en, col4Width);
    doc.text(explanationLines[0] || '', col4X, curY + 4.2);
    if (explanationLines[1]) {
      doc.text(explanationLines[1], col4X, curY + 8.2);
    }

    curY += rowHeight;
  });

  // Clinical & Cultural Directives Box (Saudi MOH Compliance)
  curY += 4; // ~174.7mm
  const directivesBoxHeight = 22;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(cardX, curY, cardWidth, directivesBoxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(15, 23, 42);
  doc.text('MANDATED RESILIENCE & CULTURAL PROTOCOLS (SAUDI MOH COMPLIANCE):', cardX + 4, curY + 4.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(51, 65, 85);
  doc.text('• Zero Forced Disclosure: Never compel trauma narrative or forced group debriefing during technical AARs.', cardX + 4, curY + 9.5);
  doc.text('• Respectful Accompaniment: Honor natural grief (Rahmah) and Islamic bereavement etiquette; avoid toxic positivity.', cardX + 4, curY + 13.8);
  doc.text('• Confidential Institutional Linking: Direct employees to MOH 937 & NCMHP Qareebon with strict privacy.', cardX + 4, curY + 18.0);

  // Saudi Referral Resources Box (Two Structured Non-Overlapping Columns)
  curY += directivesBoxHeight + 3.5; // ~200.2mm
  const referralBoxHeight = 19;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.25);
  doc.roundedRect(cardX, curY, cardWidth, referralBoxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text('CONFIDENTIAL NATIONAL REFERRAL PATHWAYS (24/7 SUPPORT):', cardX + 4, curY + 4.5);

  // Left Referral Column: MOH 937
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(22, 101, 52); // emerald-800
  doc.text('MOH 937 Tele-Counseling Helpline (Dial 937 -> Press 1)', cardX + 4, curY + 9.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(71, 85, 105);
  doc.text('24/7 Free medical & psychological telephone consultations across KSA.', cardX + 4, curY + 14.5);

  // Right Referral Column: NCMHP Qareebon
  const rightRefX = pageWidth / 2 + 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(22, 101, 52);
  doc.text('NCMHP Qareebon Mental Health Platform (920033360)', rightRefX, curY + 9.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(71, 85, 105);
  doc.text('Specialized tele-counseling hotline and confidential mobile consultation app.', rightRefX, curY + 14.5);

  // Official Institutional Verification & Authority Block
  curY += referralBoxHeight + 4; // ~223.2mm
  const sigColWidth = (cardWidth - 10) / 2; // 82mm
  const leftSigX = cardX + 2;
  const rightSigX = cardX + sigColWidth + 8;

  // Left Authority Signature Line
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.35);
  doc.line(leftSigX, curY + 10, leftSigX + sigColWidth, curY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Dr. Tariq Al-Ghamdi, MD, MPH', leftSigX, curY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Director of Occupational Health & Emergency Resilience', leftSigX, curY + 17.5);
  doc.setFontSize(5.8);
  doc.setTextColor(148, 163, 184);
  doc.text('King Salman International Airport (KSIA) Administration', leftSigX, curY + 21);

  // Right Authority Signature Line
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.35);
  doc.line(rightSigX, curY + 10, rightSigX + sigColWidth, curY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Eng. Fahad Al-Otaibi, CEM', rightSigX, curY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Chief of Crisis Management (KSIA EROC Command)', rightSigX, curY + 17.5);
  doc.setFontSize(5.8);
  doc.setTextColor(148, 163, 184);
  doc.text('King Salman International Airport (KSIA) Administration', rightSigX, curY + 21);

  // Official Footer - Two Separate Guaranteed Non-Overlapping Lines
  const footerDividerY = pageHeight - margin - 12; // 271mm
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(cardX, footerDividerY, cardRight, footerDividerY);

  // Footer Row 1
  const footerLine1Y = footerDividerY + 4; // 275mm
  doc.setFontSize(6.2);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('King Salman International Airport (KSIA) Administration Complex, Riyadh, KSA', cardX + 1, footerLine1Y);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(71, 85, 105);
  doc.text(`Ref: ${report.auditHash}`, cardRight - 1, footerLine1Y, { align: 'right' });

  // Footer Row 2
  const footerLine2Y = footerDividerY + 8; // 279mm
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(148, 163, 184);
  doc.text('Official PFA Audit Record • Validated in compliance with WHO PFA & Saudi MOH Guidelines', cardX + 1, footerLine2Y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.text(`Evaluated: ${report.participant.assessmentDate} • Score: ${report.score}/${report.totalQuestions}`, cardRight - 1, footerLine2Y, { align: 'right' });

  // Save filename
  const sanitizedEmployeeId = report.participant.employeeId.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'REC';
  const fileName = `KSIA_PFA_HumanSupport_Report_${sanitizedEmployeeId}.pdf`;
  doc.save(fileName);
  return fileName;
}

