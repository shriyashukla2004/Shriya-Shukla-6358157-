using System;

namespace FactoryMethodPatternExample
{
    public interface IDocument
    {
        void Open();
    }

    public class WordDocument : IDocument
    {
        public void Open() => Console.WriteLine("Opening a Word document.");
    }

    public class PdfDocument : IDocument
    {
        public void Open() => Console.WriteLine("Opening a PDF document.");
    }

    public class ExcelDocument : IDocument
    {
        public void Open() => Console.WriteLine("Opening an Excel document.");
    }

    public abstract class DocumentFactory
    {
        public abstract IDocument CreateDocument();
    }

    public class WordDocumentFactory : DocumentFactory
    {
        public override IDocument CreateDocument() => new WordDocument();
    }

    public class PdfDocumentFactory : DocumentFactory
    {
        public override IDocument CreateDocument() => new PdfDocument();
    }

    public class ExcelDocumentFactory : DocumentFactory
    {
        public override IDocument CreateDocument() => new ExcelDocument();
    }

    class Program
    {
        static void Main()  // simplified version
        {
            DocumentFactory wordFactory = new WordDocumentFactory();
            IDocument wordDoc = wordFactory.CreateDocument();
            wordDoc.Open();

            DocumentFactory pdfFactory = new PdfDocumentFactory();
            IDocument pdfDoc = pdfFactory.CreateDocument();
            pdfDoc.Open();

            DocumentFactory excelFactory = new ExcelDocumentFactory();
            IDocument excelDoc = excelFactory.CreateDocument();
            excelDoc.Open();
        }
    }
}