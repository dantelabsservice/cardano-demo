import { CSSObject } from "@chakra-ui/react";

export const globalStyle: CSSObject = {
  html: {
    fontSize: "16px",
  },
  "html, body": {
    backgroundColor: "gray.50",
    color: "primary.black",
  },
  body: {
    minWidth: "320px",
    fontFamily: "body",
    fontSize: "sm",
  },
  "*": {
    boxSizing: "border-box",
    scrollbarColor: "#555 transparent",
  },
};

export const printSchema = (printContent: HTMLElement | null) => `
<html>
  <head>
    <title>Print Content</title>
    <style>
      @media print {
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: left;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .list-result-item {
          margin-top: 30px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
          width: 90%;
        }
        .list-result-subitem {
          margin-top: 15px;
          padding: 10px;
          border-top: 1px solid #ddd;
          font-size: 14px;
          line-height: 1.6;
          color: #333;
        }
        p {
          line-height: 1.6;
          margin: 10px 0;
          color: #555;
        }
        .result-item-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          margin: 10px 0;
          border-top: 1px dashed #ccc;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
        }
        .result-item-info span {
          display: block;
          text-align: left;
          width: 48%;
        }
        label {
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }
        h1, h2, h3 {
          margin: 0;
          padding: 10px 0;
          border-bottom: 2px solid #ddd;
          width: 100%;
          text-align: center;
          color: #333;
        }
        ul {
          padding-left: 20px;
          list-style-type: disc;
        }
        li {
          margin: 5px 0;
          line-height: 1.4;
        }
        .no-print {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    ${printContent?.innerHTML}
  </body>
</html>
`;
