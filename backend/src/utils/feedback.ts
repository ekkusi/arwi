import { analyzeEvaluations, calculateGradeSuggestion } from "arwi-shared";
import { CollectionType, Feedback, Group, Student } from "@prisma/client";
import { PDFDocument, StandardFonts, breakTextIntoLines, PDFPage } from "pdf-lib";
import { EvaluationWithCollectionTypeInfo, mapEvaluationsByCollectionType } from "@/graphql/utils/mappers";

export type StudentWithFeedbacksAndEvaluations = Student & {
  feedbacks: Feedback[];
  evaluations: (EvaluationWithCollectionTypeInfo & {
    evaluationCollection: {
      id: string;
      type: {
        weight: number;
        id: string;
      };
    };
  })[];
};

const PAGE_MARGIN = 25;
const BASE_TEXT_SIZE = 12;

const setupPage = (page: PDFPage) => {
  const { height } = page.getSize();
  page.setFontSize(BASE_TEXT_SIZE);
  page.moveTo(PAGE_MARGIN, height - PAGE_MARGIN);
};

export async function generateFeedbackPDF(group: Group, collectionTypes: CollectionType[], studentsWithData: StudentWithFeedbacksAndEvaluations[]) {
  const pdfDoc = await PDFDocument.create();
  const font = pdfDoc.embedStandardFont(StandardFonts.Helvetica);

  const measureWidth = (s: string) => font.widthOfTextAtSize(s, BASE_TEXT_SIZE);

  let page = pdfDoc.addPage();
  setupPage(page);
  const { width } = page.getSize();

  page.moveDown(2 * BASE_TEXT_SIZE);
  page.drawText(`Loppuarviointikooste ryhmälle: ${group.name}`, {
    size: 20,
  });
  page.moveDown(2 * BASE_TEXT_SIZE);

  const safeDrawText = (text: string) => {
    const maxWidth = width - PAGE_MARGIN * 2;
    // breakTextIntoLines doesn't work with line breaks, hence the check for line length
    const lines = text.split(/\r?\n|\r|\n/g).map((line) => line.trim());
    if (page.getY() - lines.length * BASE_TEXT_SIZE < PAGE_MARGIN) {
      page = pdfDoc.addPage();
      setupPage(page);
    }
    lines.forEach((line) => {
      const numberOfLines = line.length > 0 ? breakTextIntoLines(line, pdfDoc.defaultWordBreaks, maxWidth, measureWidth).length : 1;
      page.drawText(line, {
        size: BASE_TEXT_SIZE,
        maxWidth,
        lineHeight: BASE_TEXT_SIZE,
      });

      page.moveDown(numberOfLines * BASE_TEXT_SIZE);
    });
  };

  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < studentsWithData.length; i += 1) {
      const student = studentsWithData[i];
      const latestFeedback = student.feedbacks.sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      })[0];
      // Group evaluations by collection types
      const { defaultEvaluations, classParticipationEvaluations } = mapEvaluationsByCollectionType(student.evaluations, collectionTypes);
      const mappedDefaultEvaluations = defaultEvaluations.map((evaluation) => ({ ...evaluation, collection: evaluation.evaluationCollection }));
      const { skillsMean, behaviourMean } = analyzeEvaluations(classParticipationEvaluations);
      const classParticipationWeight = collectionTypes.find((type) => type.category === "CLASS_PARTICIPATION")?.weight || 0;
      const gradeSuggestion = calculateGradeSuggestion(skillsMean, behaviourMean, classParticipationWeight, mappedDefaultEvaluations);

      const studentString = `
        Oppilas: ${student.name}

        Arvosanaehdotus: ${gradeSuggestion.toFixed(1)}

        Loppupalaute:

        ${latestFeedback.text}
      `;

      safeDrawText(studentString);
      if (i !== studentsWithData.length - 1) {
        page.drawLine({
          start: { x: PAGE_MARGIN, y: page.getY() },
          end: { x: width - PAGE_MARGIN * 2, y: page.getY() },
        });
        page.moveDown(2 * BASE_TEXT_SIZE);
      }
    }
  }

  const pdfBytes = await pdfDoc.save();

  // Return path to the generated PDF
  return pdfBytes;
}
