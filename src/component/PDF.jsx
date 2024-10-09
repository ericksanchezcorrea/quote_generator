import {
  Document,
  Page,
  StyleSheet,
  Image,
  View,
  PDFViewer,
  PDFDownloadLink,  // Importar PDFDownloadLink
  Text,
  Font,
} from "@react-pdf/renderer";
import ServiciosGenerales from "../images/servicios_generales.png";

// Registrar la fuente Roboto (o cualquier otra que prefieras)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" }, // Ruta desde el directorio `public`
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "500px",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  sectionImage: {
    padding: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "auto",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 10,
    marginBottom: 5,
    textAlign: "left",
  },
  textMayus: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableContainer: {
    marginTop: 10,
    width: "80%",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColWithBorder: {
    fontFamily: "Roboto",
    padding: 5,
    textAlign: "center",
    borderLeft: "0.6pt solid #000",
    borderBottom: "0.6pt solid #000",
    fontSize: 10,
  },
  tableColLastWithBorder: {
    padding: 5,
    textAlign: "center",
    borderLeft: "0.6pt solid #000",
    borderRight: "0.6pt solid #000",
    borderBottom: "0.6pt solid #000",
    fontSize: 10,
  },
  tableColHeader: {
    padding: 5,
    textAlign: "center",
    border: "0.6pt solid #000",
    fontSize: 10,
  },
  tableColEmpty: {
    width: "65%",
    borderStyle: "none",
  },
});

function formatearNumero(numero) {
    // Convertir el número a una cadena para manipularlo
    const numeroStr = numero.toString();

    // Separar la parte entera y decimal
    const partes = numeroStr.split(".");
    const parteEntera = partes[0];
    const parteDecimal = partes[1] || "";
  
    // Agregar comas cada tres dígitos en la parte entera
    const parteEnteraFormateada = parteEntera.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
  
    // Unir las partes y devolver el número formateado
    return parteEnteraFormateada + "." + parteDecimal;
}

function PDFDocument({datos:{condiciones, fecha, asunto, atencion, cantidad, precioUnitario, numero}}) {
  const cantidadInt = parseInt(cantidad);
  const precioUnitarioFloat = parseInt(parseInt(precioUnitario).toFixed(2));
  const importe = precioUnitarioFloat * cantidadInt;
  const igv = parseFloat((importe * 0.18).toFixed(1));
  const total = importe + igv;

  const condicionesVerdaderas = [];

  for (let i = 0; i < condiciones.length; i++) {
    const condicion = condiciones[i];
    if(condicion['checked'] === true){
      condicionesVerdaderas.push(condicion);
    } 
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
            <View style={styles.sectionImage}>
              <Image style={styles.image} src={ServiciosGenerales} />
            </View>
            <Text
              style={[styles.text, styles.textMayus, { marginTop: "20px" }]}
            >
              De: JOSÉ VALLADARES CAYCHO
            </Text>
            <Text style={[styles.text, styles.textMayus]}>
              RUC: 10154535590
            </Text>
            <Text style={[styles.text, { textAlign: "right", width: "80%" }]}>
              Lima, {fecha}
            </Text>
            <Text
              style={[
                styles.text,
                { textAlign: "left", width: "80%", marginBottom: "8px" },
              ]}
            >
              Señor(es):
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                {" "}
                PRODAC S.A
              </Text>
            </Text>
            <Text
              style={[
                styles.text,
                {
                  textAlign: "left",
                  width: "80%",
                  textTransform: "capitalize",
                  marginBottom: "8px",
                },
              ]}
            >
              Atención: {atencion}
            </Text>
            <Text
              style={[
                styles.text,
                { textAlign: "left", width: "80%", marginBottom: "8px" },
              ]}
            >
              Cotización: {numero}-{new Date().getFullYear()}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  textAlign: "left",
                  width: "80%",
                  textTransform: "capitalize",
                  marginBottom: "8px",
                },
              ]}
            >
              Asunto:{" "}
              <Text style={[styles.text, styles.textMayus]}>{asunto}</Text>
            </Text>

            <Text style={[styles.text, { textAlign: "left", width: "80%" }]}>
              Mediante la presente le hacemos llegar la cotización solicitada
              por:
            </Text>
            <Text
              style={[
                styles.text,
                styles.textMayus,
                {
                  textAlign: "left",
                  width: "80%",
                  textTransform: "capitalize",
                },
              ]}
            >
             {asunto.replace(/\s*[-–]\s*.*/, "")}
            </Text>

            {/* Contenedor simulado de tabla */}
            <View style={styles.tableContainer}>
              {/* Cabecera de la tabla */}
              <View style={styles.tableRow}>
                <Text
                  style={[
                    styles.tableColHeader,
                    styles.textMayus,
                    { borderRight: "none", width: "15%" },
                  ]}
                >
                  CANT.
                </Text>
                <Text
                  style={[
                    styles.tableColHeader,
                    styles.textMayus,
                    { borderRight: "none", width: "50%" },
                  ]}
                >
                  DESCRIPCIÓN
                </Text>
                <Text
                  style={[
                    styles.tableColHeader,
                    styles.textMayus,
                    { borderRight: "none", width: "15%" },
                  ]}
                >
                  P. UNIT
                </Text>
                <Text
                  style={[
                    styles.tableColHeader,
                    styles.textMayus,
                    { width: "20%" },
                  ]}
                >
                  IMPORTE
                </Text>
              </View>

              {/* Primera fila de datos */}
              <View style={styles.tableRow}>
                <Text style={[styles.tableColWithBorder, { width: "15%" }]}>
                  {cantidadInt ? `${cantidadInt} unid` : ""}
                </Text>
                <Text
                  style={[
                    styles.tableColWithBorder,
                    styles.textMayus,
                    { width: "50%", wordWrap: "break-word" },
                  ]}
                >
                  {asunto.replace(/\s*[-–]\s*.*/, "")}

                </Text>
                <Text style={[styles.tableColWithBorder, { width: "15%" }]}>
                  {precioUnitarioFloat
                    ? `S/     ${precioUnitarioFloat.toFixed(2)}`
                    : ""}
                </Text>
                <Text style={[styles.tableColLastWithBorder, { width: "20%" }]}>
                  {importe
                    ? `S/     ${formatearNumero(importe.toFixed(2))}`
                    : ""}
                </Text>
              </View>

              {/* Fila adicional para SUB-TOTAL */}
              <View style={styles.tableRow}>
                <Text style={styles.tableColEmpty}></Text>
                <Text
                  style={[
                    styles.tableColWithBorder,
                    styles.textMayus,
                    { width: "15%" },
                  ]}
                >
                  SUB-TOTAL
                </Text>
                <Text style={[styles.tableColLastWithBorder, { width: "20%" }]}>
                  {importe
                    ? `S/     ${formatearNumero(importe.toFixed(2))}`
                    : ""}
                </Text>
              </View>

              {/* Fila adicional para I.G.V. */}
              <View style={styles.tableRow}>
                <Text style={styles.tableColEmpty}></Text>
                <Text
                  style={[
                    styles.tableColWithBorder,
                    styles.textMayus,
                    { width: "15%" },
                  ]}
                >
                  I.G.V.
                </Text>
                <Text style={[styles.tableColLastWithBorder, { width: "20%" }]}>
                  {igv ? `S/     ${formatearNumero(igv.toFixed(2))}` : ""}
                </Text>
              </View>

              {/* Fila adicional para TOTAL */}
              <View style={styles.tableRow}>
                <Text style={styles.tableColEmpty}></Text>
                <Text
                  style={[
                    styles.tableColWithBorder,
                    styles.textMayus,
                    { width: "15%" },
                  ]}
                >
                  TOTAL
                </Text>
                <Text style={[styles.tableColLastWithBorder, { width: "20%" }]}>
                  {total ? `S/     ${formatearNumero(total.toFixed(2))}` : ""}
                </Text>
              </View>
            </View>

            <View style={{ width: "80%" }}>
              <Text
                style={[
                  styles.textMayus,
                  {
                    marginTop: "30px",
                    marginBottom: "30px",
                    color: "#112552",
                    textDecoration: "underline",
                  },
                ]}
              >
                Condiciones Comerciales:
              </Text>
              {condicionesVerdaderas.map(({ texto }, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      textAlign: "left",
                      marginBottom: "10px",
                    }}
                  >
                    <View
                      style={{
                        height: "3px",
                        width: "3px",
                        borderRadius: "50%",
                        backgroundColor: "black",
                        position: "relative",
                        marginTop: "5px",
                        marginRight: "30px",
                      }}
                    ></View>
                    <Text style={{ display: "inline-block", fontSize: 11 }}>
                      {texto.charAt(0).toUpperCase() + texto.slice(1)}{" "}
                    </Text>
                  </View>
                );
              })}
              <Text style={[styles.text, { marginTop: "20px" }]}>
                Sin otro particular nos despedimos de Ud. Esperando sus gratas
                órdenes.
              </Text>
              <Text style={[styles.text, { marginTop: "20px" }]}>Atte.</Text>
              <Text style={[styles.textMayus, { color: "#112552" }]}>
                JOSE VALLADARES
              </Text>
            </View>
          </Page>
        </Document>

  );
}

function PDF({ datos }) {
  return (
    <div>
      <PDFViewer style={styles.pdfViewer}>
        <PDFDocument datos={datos} />
      </PDFViewer>

      <PDFDownloadLink
        document={<PDFDocument datos={datos} />}
        fileName={`Cotizacion N° ${datos.numero}.pdf`}
        style={{ textDecoration: 'none', color: '#000', marginTop: '10px', border:'1px solid black', padding:'3px', borderRadius:'3px', backgroundColor:'lime' }}
      >
        {({ blob, url, loading, error }) => 
          loading ? 'Cargando documento...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default PDF;
