import { Button } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";

export const CreatePDFButton = (props) => {
    let idOfComponentToConvertToPDF = props.idOfComponent;
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (isHidden) {
            saveComponentAsPDF(idOfComponentToConvertToPDF);
            setIsHidden(false);
        }
    }, [isHidden]);

    const saveComponentAsPDF = (componentId) => {
        const componentToPrint = document.getElementById(componentId);
        let todayDate = new Date();
        html2canvas(componentToPrint).then((canvas) => {
            let imgWidth = 208;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL("img/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 0, -30, imgWidth, imgHeight);
            pdf.save("Report_" + todayDate.toLocaleDateString() + ".pdf");
        });
    };

    return (
        <Button
            hidden={isHidden}
            colorScheme={"red"}
            variant="outline"
            onClick={() => setIsHidden(true)}
        >
            Export to PDF
        </Button>
    );
};
